const { cmd } = require("../command");
const { ytsearch } = require("@dark-yasiya/yt-dl.js");

const commandmp4 = {
  pattern: "mp4",
  alias: ["video", "ytv"],
  react: "🎥",
  desc: "Download YouTube video",
  category: "main",
  use: ".mp4 <Yt url or Name>",
  filename: __filename
};

cmd(commandmp4, async (client, message, args, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) {
      return await reply("*Please provide a YouTube URL or video name.*");
    }

    const searchResult = await ytsearch(q);

    if (searchResult.results.length < 1) {
      return reply("No results found!");
    }

    let videoInfo = searchResult.results[0];
    let apiURL = "https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(videoInfo.url);
    
    let response = await fetch(apiURL);
    let data = await response.json();

    if (data.status !== 200 || !data.success || !data.result.download_url) {
      return reply("Failed to fetch the video. Please try again later.");
    }

    const videoMessage = {
      video: { url: data.result.download_url },
      mimetype: "video/mp4"
    };

    const sendOptions = { quoted: message };

    await client.sendMessage(from, videoMessage, sendOptions);

  } catch (error) {
    console.log(error);
    reply("An error occurred. Please try again later.");
  }
});
