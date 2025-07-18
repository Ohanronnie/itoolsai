import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 4000,
    ENV: process.env.APP_ENV,
  },
  DB: {
    URL: process.env.MONGO_URI,
  },
};
