const axios = require("axios");

async function tiktokDl(url) {
  try {
    let data = [];

    function formatNumber(integer) {
      let numb = parseInt(integer);
      return Number(numb).toLocaleString().replace(/,/g, ".");
    }

    function formatDate(n, locale = "id-ID") {
      let d = new Date(n * 1000);
      return d.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }

    const res = (
      await axios.post(
        "https://www.tikwm.com/api/",
        {},
        {
          params: {
            url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
          },
          timeout: 15000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10) Chrome/116 Mobile Safari/537.36",
            Referer: "https://www.tikwm.com/",
          },
        }
      )
    ).data.data;

    if (!res) throw new Error("Data kosong dari API");

    // PHOTO
    if (res.duration === 0) {
      res.images?.forEach((v) => {
        data.push({ type: "photo", url: v });
      });
    } else {
      data.push(
        {
          type: "watermark",
          url: "https://www.tikwm.com" + (res.wmplay || ""),
        },
        {
          type: "nowatermark",
          url: "https://www.tikwm.com" + (res.play || ""),
        },
        {
          type: "nowatermark_hd",
          url: "https://www.tikwm.com" + (res.hdplay || ""),
        }
      );
    }

    return {
      status: true,
      title: res.title,
      taken_at: formatDate(res.create_time),
      region: res.region,
      id: res.id,
      duration: res.duration + " Seconds",
      cover: "https://www.tikwm.com" + res.cover,

      data,

      music_info: {
        id: res.music_info?.id,
        title: res.music_info?.title,
        author: res.music_info?.author,
        album: res.music_info?.album || null,
        url:
          "https://www.tikwm.com" +
          (res.music || res.music_info?.play || ""),
      },

      stats: {
        views: formatNumber(res.play_count),
        likes: formatNumber(res.digg_count),
        comment: formatNumber(res.comment_count),
        share: formatNumber(res.share_count),
        download: formatNumber(res.download_count),
      },

      author: {
        id: res.author?.id,
        fullname: res.author?.unique_id,
        nickname: res.author?.nickname,
        avatar: "https://www.tikwm.com" + res.author?.avatar,
      },
    };
  } catch (e) {
    throw new Error(e.message || "Scrape gagal");
  }
}

module.exports = { tiktokDl };
