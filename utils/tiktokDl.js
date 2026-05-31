const axios = require("axios");

async function tiktokDl(url) {
  try {
    const { data } = await axios.get("https://www.tikwm.com/api/", {
      params: { url, hd: 1 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/116 Safari/537.36"
      }
    });

    const res = data?.data;
    if (!res) throw new Error("TikTok data not found");

    const isImage = res.duration === 0;

    return {
      title: res.title,
      cover: res.cover ? "https://www.tikwm.com" + res.cover : null,

      author: {
        username: res.author?.unique_id,
        nickname: res.author?.nickname
      },

      stats: {
        views: res.play_count,
        likes: res.digg_count,
        comment: res.comment_count,
        share: res.share_count
      },

      media: isImage
        ? (res.images || []).map(v => ({ type: "photo", url: v }))
        : [
            { type: "wm", url: "https://www.tikwm.com" + res.wmplay },
            { type: "nowm", url: "https://www.tikwm.com" + res.play },
            { type: "hd", url: "https://www.tikwm.com" + res.hdplay }
          ]
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { tiktokDl };
