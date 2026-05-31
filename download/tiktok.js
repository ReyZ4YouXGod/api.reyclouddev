const { tiktokDl } = require("../utils/tiktok");

module.exports = async (req, res) => {
  // CORS GLOBAL
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url required"
      });
    }

    const data = await tiktokDl(url);

    return res.status(200).json({
      status: true,
      result: data
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
