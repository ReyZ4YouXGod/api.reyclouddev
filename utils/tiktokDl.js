const axios = require("axios");

async function tiktokDl(url) {
  const domain = "https://www.tikwm.com/api/";

  const { data } = await axios.get(domain, {
    params: { url, hd: 1 }
  });

  const res = data.data;

  let result = {
    title: res.title,
    author: res.author?.nickname,
    cover: "https://www.tikwm.com" + res.cover,
    data: []
  };

  if (res.duration === 0) {
    result.data = res.images.map(v => ({
      type: "photo",
      url: v
    }));
  } else {
    result.data.push(
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
    );
  }

  return result;
}

module.exports = { tiktokDl };      duration: res.duration + " Seconds",
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
