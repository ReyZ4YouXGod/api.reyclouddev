const axios = require("axios");

async function tiktokDl(url) {
  try {
    const res = await axios.get("https://www.tikwm.com/api/", {
      params: {
        url,
        hd: 1
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/116 Safari/537.36"
      }
    });

    const data = res.data?.data;
    if (!data) throw new Error("Data TikTok tidak ditemukan");

    const isImage = data.duration === 0;

    return {
      status: true,

      title: data.title || "-",

      author: {
        id: data.author?.id,
        username: data.author?.unique_id,
        nickname: data.author?.nickname,
        avatar: data.author?.avatar
          ? "https://www.tikwm.com" + data.author.avatar
          : null
      },

      stats: {
        views: Number(data.play_count || 0).toLocaleString("id-ID"),
        likes: Number(data.digg_count || 0).toLocaleString("id-ID"),
        comment: Number(data.comment_count || 0).toLocaleString("id-ID"),
        share: Number(data.share_count || 0).toLocaleString("id-ID")
      },

      cover: data.cover
        ? "https://www.tikwm.com" + data.cover
        : null,

      media: isImage
        ? (data.images || []).map((v) => ({
            type: "photo",
            url: v
          }))
        : [
            {
              type: "watermark",
              url: "https://www.tikwm.com" + (data.wmplay || "")
            },
            {
              type: "nowatermark",
              url: "https://www.tikwm.com" + (data.play || "")
            },
            {
              type: "hd",
              url: "https://www.tikwm.com" + (data.hdplay || "")
            }
          ],

      music: {
        title: data.music_info?.title || "-",
        author: data.music_info?.author || "-",
        url:
          data.music ||
          data.music_info?.play ||
          null
      }
    };

  } catch (e) {
    return {
      status: false,
      message: e.message
    };
  }
}

module.exports = { tiktokDl };
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
