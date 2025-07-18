import { ENVIRONMENT } from "./common/config/environment.js";
import express from "express";
import AppError from "./common/utils/appError.js";
import { setRoutes } from "./modules/routes/index.js";
import {
  catchAsync,
  handleError,
  timeoutMiddleware,
} from "./common/utils/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { stream } from "./common/utils/logger.js";
import morgan from "morgan";
import { connectDb } from "./common/config/database.js";
import fs, { writeFileSync } from "fs";
import path from "path";
import { runForAllUsers } from "./modules/controllers/twitter/post.js";


const app = express();
const port = process.env.PORT || ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

/**
 * App Security
 */
app.set("trust proxy", true);
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3000/',
    ],
    method: ["GET", "POST", "DELETE", "HEAD", "PUT", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.disable("x-powered-by");
app.use(compression());

/**
 * Logger Middleware
 */
app.use(
  morgan(ENVIRONMENT.APP.ENV !== "local" ? "combined" : "dev", { stream }),
);

// append request time to all request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/video", (req, res) => {
  try {
    const videoPath = path.join(
      process.cwd(),
      "uploads",
      req.query.path || "testfile",
    ); // Update with your video file path

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
        "Cross-Origin-Resource-Policy": "cross-origin",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment",
        "Cross-Origin-Resource-Policy": "cross-origin",
      };
      res.writeHead(200, head);
      //   res.download(videoPath)
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    console.error(err);
  }
});
app.use("/", setRoutes());
app.all("/", (req, res) => {
  res.send({
    status: "running",
    message: "Welcome to the API"+' '+new Date(),
  });
});
app.use(timeoutMiddleware);
app.use(handleError);
app.get("*", (req, res) =>
  res.send({
    Time: new Date(),
    status: "running",
  }),
);


setInterval(() => {
  function getCurrentTime() {
    const currentTime = new Date();
    return currentTime.toISOString();
  }
  const logMessage = `Cron job running at ${getCurrentTime()}\n`;
  writeFileSync(path.join(process.cwd(), "cron.log"), logMessage, {
    flag: "a",
  });
}, 1000);



setInterval(async () => {
  console.log("Cron job running at", new Date().toISOString());
  await runForAllUsers(
    { userId: "649b0f1a2c4d3e2f8c5b6e7d" }, // Mocked request object
    { json: (data) => console.log("Response:", data) }, // Mocked response object
  );
  console.log("Cron job completed at", new Date().toISOString());
}, 1000 * 60); 



app.listen(port, "0.0.0.0", () => {
  console.log("=> " + appName + "app listening on port" + port + "!");
  connectDb();
});
