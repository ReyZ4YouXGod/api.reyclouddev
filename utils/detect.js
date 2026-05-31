function detect(url = "") {
  url = url.toLowerCase();

  if (url.includes("tiktok")) return "tiktok";
  if (url.includes("instagram")) return "instagram";
  if (url.includes("mediafire")) return "mediafire";

  return null;
}

module.exports = { detect };
