const { tiktokDl } = require("../utils/tiktokDl");

module.exports = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        message: "Method not allowed"
      });
    }

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib"
      });
    }

    const result = await tiktokDl(url);

    return res.status(200).json({
      status: true,
      creator: "reyy",
      result
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
