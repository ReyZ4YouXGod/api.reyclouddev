const { detect } = require("../utils/detect");
const { tiktokDl } = require("../utils/tiktok");
const { igDl } = require("../utils/instagram");
const { mediafire } = require("../utils/mediafire");

module.exports = async (req, res) => {
  // optional CORS (aman untuk browser)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ status: false });

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib"
      });
    }

    const type = detect(url);

    if (!type) {
      return res.status(400).json({
        status: false,
        message: "platform tidak didukung"
      });
    }

    let result;

    if (type === "tiktok") result = await tiktokDl(url);
    if (type === "instagram") result = await igDl(url);
    if (type === "mediafire") result = await mediafire(url);

    return res.status(200).json({
      status: true,
      type,
      result
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
