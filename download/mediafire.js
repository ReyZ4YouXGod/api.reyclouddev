const cors = require("../../utils/cors");
const { mediafire } = require("../../utils/mediafire");

module.exports = async (req, res) => {
  try {
    if (cors(req, res)) return;

    if (req.method !== "GET") {
      return res.status(405).json({ status: false });
    }

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ status: false, message: "url wajib" });
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
