const { mediafire } = require("../../utils/mediafire");

module.exports = async (req, res) => {
  try {
    // 🔥 CORS WAJIB
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        message: "GET only"
      });
    }

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib"
      });
    }

    const result = await mediafire(url);

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
