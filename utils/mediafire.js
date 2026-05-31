const cheerio = require("cheerio");
const { basename, extname } = require("path");

async function mediafire(url) {
  const html = await fetch(url).then(r => r.text());
  const $ = cheerio.load(html);

  const title =
    $("meta[property='og:title']").attr("content") || "";

  const $a = $("a.popsok")
    .filter((_, el) => $(el).attr("href") === "javascript:void(0)")
    .first();

  const b64 = $a.attr("data-scrambled-url");

  const dl = b64
    ? Buffer.from(b64, "base64").toString("utf-8")
    : null;

  if (!dl) throw new Error("Download URL tidak ditemukan");

  return {
    name: title,
    filename: basename(dl),
    type: extname(dl),
    download: dl
  };
}

module.exports = { mediafire };
