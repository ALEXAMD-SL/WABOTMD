const { isUrl } = require('../lib/functions');
const getFBInfo = require("@xaviabot/fb-downloader");
const cheerio = require('cheerio')
const { igdl } = require('ruhend-scraper')
const fetch = require('node-fetch'); // Ensure fetch is imported
const axios = require('axios');
const { cmd, commands } = require('../command')
const config = require('../config');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

// Facebook Downloader
cmd({
  pattern: "facebook",
  alias: ["fb"],
  desc: "Download Facebook videos",
  category: "download",
  use: ".facebook <link>",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "Please provide a valid URL.⁉️" }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

const result = await getFBInfo(q);

    const captionHeader = `
┏━┫> 💀ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ🪄🖇️┣━✾
┃            *ᴸ  ͣ  ͣ  ͬ  ͣ  ✻  ᴸ  ͣ  ͣ  ͬ  ͣ*
┻
*⌛ᴅᴜʀᴀᴛɪᴏɴ* : ${result.title}

*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*

*ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎬*

*1.1*     ┃  *ꜱᴅ Qᴜᴀʟɪᴛʏ*
*1.2*     ┃  *ʜᴅ Qᴜᴀʟɪᴛʏ*

*ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎧*

*2.1*     ┃  *ᴀᴜᴅɪᴏ*
*2.2*     ┃  *ᴅᴏᴄᴜᴍᴇɴᴛ*
*2.3*     ┃  *ᴠᴏɪᴄᴇ*

> 💀ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ🪄🖇️

`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
  contextInfo: {
      mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363192254044294@newsletter',
          newsletterName: "ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ",
          serverMessageId: 1
      },
      
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        
        

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
            await conn.sendMessage(from, {
              video: { url: result.sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ · · ·*",
              contextInfo: {
                  mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 1,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363192254044294@newsletter',
                      newsletterName: "ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ",
                      serverMessageId: 1
                  },
                  
              }
            });
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: result.hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ · · ·*",
              contextInfo: {
                  mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 1,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363192254044294@newsletter',
                      newsletterName: "ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ ✻",
                      serverMessageId: 1
                  },
                  
              }
            });
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: result.sd },
              mimetype: "audio/mpeg",
              fileName: `ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ/FBDL.mp3`,
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ · · ·*",
              contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363192254044294@newsletter',
                    newsletterName: "ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ ✻",
                    serverMessageId: 1
                },
                
            }
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})

/* 
• Plugin Author: Dark-Yasiya
• Follow Us: https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27
*/

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    react: "🌷",
    desc: "Download TikTok videos",
    category: "download",
    use: ".tiktok <TikTok URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        
        if (!q || !isUrl(q)) {
            return await reply("❌ Please provide a valid TikTok URL!");
        }

        const response = await dy_scrap.tiktok(q);
        if(!response?.status) return await reply("❌ Failed to download TikTok video.");
        const { id, region, title, cover, duration, play, sd, hd, music, play_count, digg_count, comment_count, share_count, download_count, collect_count } = response?.result;
        
       let info = `🍒 *𝚃𝙸𝙺𝚃𝙾𝙺 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🍒\n\n` +
           `🎵 *Title:* ${title}\n` +
           `⏳ *Duration:* ${duration}\n` +
           `👀 *Views:* ${play_count}\n` +
           `❤️ *Likes:* ${digg_count}\n\n` +
           `🔽 *Choose the quality:*\n` +
           `1 *SD Video* 📹\n` +
           `2 *HD Video* 🎥\n\n` +
           `${config.FOOTER || "> 💀ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ🪄🖇️"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: cover }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎥', key: sentMsg.key } });

        // Event listener to capture reply
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mekInfo = messageUpdate?.messages[0];
            if (!mekInfo?.message) return;

            const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
            const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToSentMsg) {
                let userReply = messageType.trim();
                let videoUrl = "";
                let msg = '';

                if (userReply === "1") {
                    msg = await conn.sendMessage(from, { text: "📥 Downloading SD Video..." }, { quoted: mek });
                    videoUrl = sd;
                } else if (userReply === "2") {
                    msg = await conn.sendMessage(from, { text: "📥 Downloading HD Video..." }, { quoted: mek });
                    videoUrl = hd;
                } else {
                    return await reply("❌ Invalid choice! Reply with 1️⃣ or 2️⃣.");
                }

                // Send the selected video
                await conn.sendMessage(from, {
                    video: { url: videoUrl },
                    caption: `🎥 *Here is your TikTok Video!*\n\n> ${title}`
                }, { quoted: mek });

                await conn.sendMessage(from, { text : '✅ Media Upload Successfull ✅' , edit : msg.key })
            }
        });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *An error occurred:* ${e.message ? e.message : "Error !"}`);
    }
});
