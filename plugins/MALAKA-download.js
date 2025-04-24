const { fetchJson } = require('../lib/functions')
const getFBInfo = require("@xaviabot/fb-downloader");
const cheerio = require('cheerio')
const { igdl } = require('ruhend-scraper')
const fetch = require('node-fetch'); // Ensure fetch is imported
const axios = require('axios');
const { cmd, commands } = require('../command')


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
┏━┫*⚬ 💀ᴍᴀᴅᴜꜱᴀɴᴋᴀ ᴍᴅ🪄🖇️*┣━✾
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
