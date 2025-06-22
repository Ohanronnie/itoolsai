import { TwitterApi } from "twitter-api-v2";
import { TwitterSchema } from "../../schemas/twitter.schema.js";
const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const REDIRECT_URI = process.env.TWITTER_REDIRECT_URI;
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
});
// Temporary store for `codeVerifier` (Replace with a DB/Redis for production)
const verifiers = new Map();

// 1️⃣ **Generate Twitter Auth URL**
export async function getAuthUrl(req, res) {
  const { url, oauth_token, oauth_token_secret } =
    await twitterClient.generateAuthLink(REDIRECT_URI, {
      scope: ["users.read", "tweet.read", "offline.access", "tweet.write"],
    });
  // Store `codeVerifier` temporarily (Use Redis/DB in production)
  verifiers.set(oauth_token, oauth_token_secret);

  console.log("Auth URL:", url);
  res.json({ url, oauth_token });
}

// 2️⃣ **Handle Twitter Callback & Exchange Code for Token**
export async function getUserDetails(req, res) {
  const { oauth_token, oauth_verifier } = req.body;
  // console.log(code,state)
  if (!oauth_token || !oauth_verifier || !verifiers.has(oauth_token)) {
    return res.status(400).json({ error: "Invalid request or state mismatch" });
  }
  try {
    const oauth_token_secret = verifiers.get(oauth_token);
    // verifiers.delete(state); // Remove it after use

    console.log("Received Code:", oauth_token);
    console.log("Stored Code Verifier:", oauth_token_secret);

    // Exchange code for access token
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret,
    });
    const { accessToken, accessSecret } = await client.login(oauth_verifier);
    console.log("Access Token:", accessToken, accessSecret);
    const loggedClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken,
      accessSecret,
    });
    let user = await loggedClient.v2.me();
    let { id, name, username } = user.data;
    console.log(req.userId, id, name, username, accessToken, accessSecret);

    const twitteruser = new TwitterSchema({
      twitterAccessToken: accessToken,
      twitterAccessSecret: accessSecret,
      twitterName: name,
      ownerId: req.userId,
    });
    await twitteruser.save();

    // ✅ Send tokens to frontend (Store them client-side)
    res.json({ name });
  } catch (error) {
    console.error("Twitter Auth Error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
}
export async function getTwitterUser(req, res) {
  const user = await TwitterSchema.findOne({ ownerId: req.userId });
  if (user) return res.json({ name: user.twitterName, times: user.times });
  return res.json(null);
}
export async function setTwitterContent(req, res) {
  let { language, contentType, country, times } = req.body;
  
  try {
    if (
      ![language, contentType, country, times].every((a) => a !== undefined)
    ) {
      return res.json(false);
    }
    await TwitterSchema.findOneAndUpdate(
      { ownerId: req.userId },
      { contentType, language, country },
    );
    await TwitterSchema.updateOne({ ownerId: req.userId }, { times: times });
    res.json(true);
  } catch (error) {
    console.log(error);
  }
}

export async function removeTwitterAccount(req, res) {
  await TwitterSchema.findOneAndDelete({ ownerId: req.userId });
  res.json(true);
}
