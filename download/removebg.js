const axios = require("axios");
const FormData = require("form-data");
const { removeBgV1 } = require("../utils/removebg");

module.exports = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");

    // ======================
    // MODE 1: URL IMAGE
    // ======================
    if (req.method === "GET") {
      const { url } = req.query;

      if (!url) {
        return res.status(400).json({
          status: false,
          message: "url required"
        });
      }

      const { data: img } = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 15000
      });

      const result = await removeBgV1(Buffer.from(img));

      return res.status(200).json({
        status: true,
        mode: "url",
        result
      });
    }

    // ======================
    // MODE 2: UPLOAD / BUFFER
    // ======================
    if (req.method === "POST") {
      const chunks = [];

      req.on("data", chunk => chunks.push(chunk));

      req.on("end", async () => {
        const buffer = Buffer.concat(chunks);

        if (!buffer.length) {
          return res.status(400).json({
            status: false,
            message: "no image uploaded"
          });
        }

        const result = await removeBgV1(buffer);

        if (!result) {
          return res.status(500).json({
            status: false,
            message: "failed remove bg"
          });
        }

        return res.status(200).json({
          status: true,
          mode: "upload",
          result
        });
      });

      return;
    }

    return res.status(405).json({
      status: false,
      message: "method not allowed"
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
