const axios = require("axios");

async function tiktokDl(url) {
  const { data } = await axios.get("https://www.tikwm.com/api/", {
    params: { url, hd: 1 }
  });

  const res = data.data;

  let result = {
    title: res.title,
    author: res.author?.nickname || "-",
    cover: "https://www.tikwm.com" + res.cover,
    data: []
  };

  if (res.duration === 0) {
    result.data = res.images.map(v => ({
      type: "photo",
      url: v
    }));
  } else {
    result.data = [
      {
        type: "watermark",
        url: "https://www.tikwm.com" + res.wmplay
      },
      {
        type: "nowatermark",
        url: "https://www.tikwm.com" + res.play
      },
      {
        type: "hd",
        url: "https://www.tikwm.com" + res.hdplay
      }
    ];
  }

  return result;
}

module.exports = { tiktokDl };}

module.exports = { tiktokDl };
