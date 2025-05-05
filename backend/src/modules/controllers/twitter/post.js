import Parser from "rss-parser";
import axios from "axios";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { TwitterApi } from "twitter-api-v2";
import { TwitterSchema } from "../../schemas/twitter.schema.js";
import { addJobToQueue } from "./job.js";
import request from "request";
import util from "util";
const parser = new Parser();
const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const seenArticles = new Map();

export async function getGoogleNewsRssFinalUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const gnArticleId = parsedUrl.pathname.split("/").pop();
    const _axios = util.promisify(request);
    const { body } = await _axios(
      `https://news.google.com/articles/${gnArticleId}`,
      { method: "GET" },
    );
    const $ = cheerio.load(body);
    const div = $("c-wiz > div").first();
    const article = {
      signature: div.attr("data-n-a-sg"),
      timestamp: div.attr("data-n-a-ts"),
      gn_art_id: gnArticleId,
    };

    console.log(article, gnArticleId, url);
    const articlesReq = [
      "Fbv4je",
      `["garturlreq",[["X","X",["X","X"],null,null,1,1,"US:en",null,1,null,null,null,null,null,0,1],"X","X",1,[1,1,1],1,1,null,0,0,null,0],"${article.gn_art_id}",${article.timestamp},"${article.signature}"]`,
    ];

    const response = await _axios(
      "https://news.google.com/_/DotsSplashUi/data/batchexecute",
      {
        method: "POST",
        body: new URLSearchParams({
          "f.req": JSON.stringify([[articlesReq]]),
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      },
    );

    let res = JSON.parse(
      JSON.parse(response.body.split("\n\n")[1].slice(0))[0][2],
    )[1];
    return res;
  } catch (error) {
    console.error("âŒ Error fetching final URL:", error.message);
    return null;
  }
}

async function summarizeWithReadability(url) {
  try {
    const { data: html } = await axios.get(url);
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    const $ = cheerio.load(html);
    const ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content");

    return {
      excerpt: article?.excerpt || "",
      image: ogImage || null,
    };
  } catch (error) {
    console.error("❌ Readability/image error:", error.message);
    return { excerpt: null, image: null };
  }
}

async function summarizeWithGemini(promptText) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `Remove any link from my prompt. Summarize this for Twitter, as an engaging tweet:\n\n${promptText}`,
            },
          ],
        },
      ],
    },
  );
  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function uploadImageToTwitter(imageUrl, accessToken, accessSecret) {
  try {
    const { data: imageBuffer } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken,
      accessSecret,
    });

    return await client.v1.uploadMedia(imageBuffer, { mimeType: "image/jpeg" });
  } catch (error) {
    console.error("❌ Image Upload Failed:", error.message);
    return null;
  }
}

async function processNiche(
  niche,
  userId,
  accessToken,
  accessSecret,
  country,
  language,
) {
  try {
    console.log(accessToken, accessSecret, 45);
    // Modify the RSS feed URL to include country and language
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(niche)}&hl=${language}&gl=${country}&ceid=${country}:${language}`;
    const feed = await parser.parseURL(rssUrl);

    // Initialize user's seen articles if not already present
    if (!seenArticles.has(userId)) {
      seenArticles.set(userId, new Set());
    }
    const alreadySeen = seenArticles.get(userId);

    for (let i = 0; i < feed.items.length; i++) {
      let item = feed.items[i];
      const finalUrl = await getGoogleNewsRssFinalUrl(item.link);
      if (!finalUrl || alreadySeen.has(finalUrl)) continue; // Skip if already seen

      const { excerpt, image } = await summarizeWithReadability(finalUrl);

      if (!excerpt) continue;

      const tweet = await summarizeWithGemini(excerpt);
      console.log(tweet);
      if (!tweet) continue;

      let mediaId = null;
      if (image)
        mediaId = await uploadImageToTwitter(image, accessToken, accessSecret);
      const postData = { ...(mediaId && { media: { media_ids: [mediaId] } }) };

      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken,
        accessSecret,
      });
      let done = await client.v2.tweet(tweet, postData);
      alreadySeen.add(finalUrl);
      seenArticles.set(userId, alreadySeen); // Update the map
      //      console.log(data)
      console.log(`✅ Posted for ${userId}: ${tweet}`);
      break; // Only process the first valid article for this user
    }
  } catch (err) {
    console.error(`❌ Error processing niche "${niche}":`, err.message);
    console.dir(err, { depth: null });
  }
}

// Main runner
export async function runForAllUsers(req, res) {
  const users = await TwitterSchema.find();
  console.log("All users:", users);
  if (!users || users.length === 0) {
    console.log("No users found");
    return res?.json?.("No users found");
  }
  console.log("Users found:", users.length);

  const normalizeTime = (times) => {
    const today = new Date();

    return times.map((t) => {
      const [hour, minute] = t.split(":");
      const time = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute,
      );
      return time;
    });
  };
  for (const user of users) {
    const times = normalizeTime(user.times);

    const now = new Date();
    for (let j = 0; j < times.length; j++) {
      console.log(
        `Checking time ${j + 1}: ${times[j].getHours()}:${times[j].getMinutes()}`,
      );
      console.log(`Current time: ${now.getHours()}:${now.getMinutes()}`);
      if (
        now.getHours() === times[j].getHours() &&
        now.getMinutes() === times[j].getMinutes()
      ) {
        console.log("Time matched");

        const jobFunction = async () => {
          try {
            const niche = user.contentType || "technology";
            const country = user.country || "US";
            const language = user.language || "en";

            console.log(
              `Processing for ${user.twitterName} | niche: ${niche} | country: ${country} | language: ${language}`,
            );
            await processNiche(
              "entertainment",
              user._id,
              user.twitterAccessToken,
              user.twitterAccessSecret,
              country,
              language,
            );
          } catch (error) {
            console.error("Error in job function:", error);
          }
        };
        addJobToQueue(jobFunction);
        //await jobFunction();
        console.log("Job added to queue");
      }
    }
  }
  res?.json?.("done");
}
