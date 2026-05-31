const cors = require("../../utils/cors");
const { tiktokDl } = require("../../utils/tiktok");

module.exports = async (req, res) => {
  try {
    if (cors(req, res)) return;

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ status: false, message: "url wajib" });
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
