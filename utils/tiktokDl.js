const axios = require("axios");

async function tiktokDl(url) {
  try {
    const formatNumber = (n) =>
      Number(parseInt(n || 0)).toLocaleString("id-ID");

    const formatDate = (n) =>
      new Date(n * 1000).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    const { data } = await axios.post(
      "https://www.tikwm.com/api/",
      {},
      {
        params: {
          url,
          hd: 1,
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/116 Safari/537.36",
        },
      }
    );

    const res = data?.data;
    if (!res) throw new Error("Gagal ambil data TikTok");

    let media = [];

    if (res.duration === 0) {
      media = (res.images || []).map((v) => ({
        type: "photo",
        url: v,
      }));
    } else {
      media = [
        {
          type: "watermark",
          url: "https://www.tikwm.com" + (res.wmplay || ""),
        },
        {
          type: "nowatermark",
          url: "https://www.tikwm.com" + (res.play || ""),
        },
        {
          type: "hd",
          url: "https://www.tikwm.com" + (res.hdplay || ""),
        },
      ];
    }

    return {
      status: true,
      title: res.title,
      taken_at: formatDate(res.create_time),
      region: res.region,
      id: res.id,
      duration: res.duration + " Seconds",
      cover: "https://www.tikwm.com" + res.cover,

      stats: {
        views: formatNumber(res.play_count),
        likes: formatNumber(res.digg_count),
        comment: formatNumber(res.comment_count),
        share: formatNumber(res.share_count),
        download: formatNumber(res.download_count),
      },

      author: {
        id: res.author?.id,
        username: res.author?.unique_id,
        nickname: res.author?.nickname,
        avatar: "https://www.tikwm.com" + res.author?.avatar,
      },

      music: {
        title: res.music_info?.title,
        author: res.music_info?.author,
        url:
          "https://www.tikwm.com" +
          (res.music || res.music_info?.play || ""),
      },

      media,
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
}

module.exports = { tiktokDl };
