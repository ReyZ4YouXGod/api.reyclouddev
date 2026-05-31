module.exports = async (req, res) => {
  // 🔥 WAJIB: CORS GLOBAL
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib"
      });
    }

    const { tiktokDl } = require("../utils/tiktok");
    const result = await tiktokDl(url);

    return res.status(200).json({
      status: true,
      result
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
