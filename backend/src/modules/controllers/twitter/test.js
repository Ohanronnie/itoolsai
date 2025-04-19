const request = require("request");
const utils = require("util");
const requestPromise = utils.promisify(request);
const fetchDecodedBatchExecute = (id) => {
  const s =
    '[[["Fbv4je","[\\"garturlreq\\",[[\\"en-US\\",\\"US\\",[\\"FINANCE_TOP_INDICES\\",\\"WEB_TEST_1_0_0\\"],null,null,1,1,\\"US:en\\",null,180,null,null,null,null,null,0,null,null,[1608992183,723341000]],\\"en-US\\",\\"US\\",1,[2,3,4,8],1,0,\\"655000234\\",0,0,null,0],\\"' +
    id +
    '\\"]",null,"generic"]]]';

  return (
    requestPromise(
      "https://news.google.com/_/DotsSplashUi/data/batchexecute?" +
        "rpcids=Fbv4je",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Referrer: "https://news.google.com/",
          "user-agent":
            "Mozilla/5.0 (Windows; U; Windows NT 10.2;) AppleWebKit/534.14 (KHTML, like Gecko) Chrome/54.0.3159.148 Safari/536",
        },
        body: "f.req=" + encodeURIComponent(s),
        method: "POST",
      },
    )
      // .then(e => e.text())
      .then((s) => {
        s = s.body;
        console.log(s);
        const header = '[\\"garturlres\\",\\"';
        const footer = '\\",';
        if (!s.includes(header)) {
          throw new Error("header not found: " + s);
        }
        const start = s.substring(s.indexOf(header) + header.length);
        if (!start.includes(footer)) {
          throw new Error("footer not found");
        }
        const url = start.substring(0, start.indexOf(footer));
        return url;
      })
      .catch(console.error)
  );
};
export const decodeGoogleNewsUrl = async (sourceUrl) => {
  const url = new URL(sourceUrl);
  const path = url.pathname.split("/");
  if (
    url.hostname === "news.google.com" &&
    path.length > 1 &&
    path[path.length - 2] === "articles"
  ) {
    const base64 = path[path.length - 1];
    let str = atob(base64);

    const prefix = Buffer.from([0x08, 0x13, 0x22]).toString("binary");
    if (str.startsWith(prefix)) {
      str = str.substring(prefix.length);
    }

    const suffix = Buffer.from([0xd2, 0x01, 0x00]).toString("binary");
    if (str.endsWith(suffix)) {
      str = str.substring(0, str.length - suffix.length);
    }

    // One or two bytes to skip
    const bytes = Uint8Array.from(str, (c) => c.charCodeAt(0));
    const len = bytes.at(0);
    if (len >= 0x80) {
      str = str.substring(2, len + 2);
    } else {
      str = str.substring(1, len + 1);
    }

    if (str.startsWith("AU_yqL")) {
      // New style encoding, introduced in July 2024. Not yet known how to decode offline.
      const url = await fetchDecodedBatchExecute(base64);
      return url;
    }

    return str;
  } else {
    return sourceUrl;
  }
};
