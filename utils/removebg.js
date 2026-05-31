const axios = require("axios");
const FormData = require("form-data");

async function removeBgV1(buffer) {
  try {
    const form = new FormData();
    form.append("file", buffer, {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });

    const { data } = await axios.post(
      "https://removebg.one/api/predict/v2",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "user-agent": "Mozilla/5.0",
          accept: "application/json",
          origin: "https://removebg.one",
          referer: "https://removebg.one/upload",
        },
        timeout: 20000,
      }
    );

    return data?.data?.cutoutUrl || null;
  } catch {
    return null;
  }
}

module.exports = { removeBgV1 };
