module.exports = async (req, res) => {
  // CORS WAJIB
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // HANDLE PRE-FLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "POST only"
    });
  }

  try {
    const chunks = [];

    req.on("data", chunk => chunks.push(chunk));

    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);

      if (!buffer.length) {
        return res.status(400).json({
          status: false,
          message: "no image"
        });
      }

      const { removeBgV1 } = require("../utils/removebg");
      const result = await removeBgV1(buffer);

      return res.status(200).json({
        status: true,
        result
      });
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};
