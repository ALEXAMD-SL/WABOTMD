const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");
const config = require('../config'); // Ensure your API key is in config
const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require('axios');
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const { downloadTiktok } = require('@mrnima/tiktok-downloader');
const { facebook } = require("@mrnima/facebook-downloader");
const apilink = 'https://www.dark-yasiya-api.site' // API LINK ( DO NOT CHANGE THIS!! )
const apkdl = require('../lib/apkdl')
function someFunction(param1, param2, param3, param4, param5) {
  return anotherFunction(param5 + 0x2b, param4);
}
// YouTube MP4 download function

cmd({
  pattern: "apk",
  desc: "Download apk.",
  category: "download",
  filename: __filename
}, async (_client, _message, _handler, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    await _handler.react('⬇');

    const url = 'http://ws75.aptoide.com/api/7/apps/search/query=' + q + '/limit=1';
    const response = await axios.get(url);
    const data = response.data;

    let sizeInMB = (data.datalist.list[0].size / 1048576).toFixed(2);

    let message = `
╭──────────────────❖
│
│*🏷️ Name :* ${data.datalist.list[0].name}
│*📦 Size :* ${sizeInMB} MB
│*🔖 Package :* ${data.datalist.list[0]['package']}
│*📆 Last Update :* ${data.datalist.list[0].updated}
│*👤 Developers :* ${data.datalist.list[0].developer.name}
│
╰──────────────────❖
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻`;

    await _handler.react('⬆');

    await _client.sendMessage(from, {
      document: {
        url: data.datalist.list[0].file.path_alt
      },
      fileName: data.datalist.list[0].name,
      mimetype: "application/vnd.android.package-archive",
      caption: message,
      contextInfo: {
        mentionedJid: ["94779062397@s.whatsapp.net"],
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382823666763@newsletter',
          newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
          serverMessageId: 999
        },
        externalAdReply: {
          title: "MALAKA-MD",
          body: "ᴍᴀʟᴀᴋᴀ",
          mediaType: 1,
          sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
          thumbnailUrl: "https://i.ibb.co/JrdxHSY/3439.jpg",
          renderLargerThumbnail: false,
          showAdAttribution: true
        }
      }
    }, {
      quoted: _message
    });

    await _handler.react('✅');
  } catch (error) {
    console.log(error);
    reply(`${error}`);
  }
});

//====================================

cmd({
  pattern: "mediafire",
  desc: "To download MediaFire files.",
  react: '🎥',
  category: "download",
  filename: __filename
}, async (_ctx, message, client, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) {
      return client.reply("Please provide a valid MediaFire link.");
    }
    client.react('⬇️');
    
    const response = await axios.get("https://www.dark-yasiya-api.site/download/mfire?url=" + q);
    const data = response.data;
    
    if (!data || !data.status || !data.result || !data.result.dl_link) {
      return client.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
    }

    const downloadLink = data.result.dl_link;
    const fileName = data.result.fileName || 'mediafire_download';
    const fileType = data.result.fileType || 'application/octet-stream';

    client.react('⬆️');
    
    let caption = `
  ╭──────────────────❖
  │ ᴍᴀʟᴀᴋᴀ-ᴍᴅ
  │
  │ *ꜰɪʟᴇ ɴᴀᴍᴇ :* ${fileName}
*ꜰɪʟᴇ ᴛʏᴘᴇ :* ${fileType}
  │ *ꜰɪʟᴇ ɴᴀᴍᴇ :* ${fileName}
*ꜰɪʟᴇ ᴛʏᴘᴇ :* ${fileType}
  │ 
  ╰──────────────────❖
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻
    `;

    await _ctx.sendMessage(from, {
      document: {
        url: downloadLink
      },
      mimetype: fileType,
      fileName: fileName,
      caption: caption,
      contextInfo: {
        mentionedJid: ["94779062397@s.whatsapp.net"],
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382823666763@newsletter",
          newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
          serverMessageId: 999
        },
        externalAdReply: {
          title: "MALAKA-MD",
          body: "ᴍᴀʟᴀᴋᴀ",
          mediaType: 1,
          sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
          thumbnailUrl: "https://i.ibb.co/JrdxHSY/3439.jpg",
          renderLargerThumbnail: false,
          showAdAttribution: true
        }
      }
    }, {
      quoted: message
    });
  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});

//====================================

cmd({
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
    const captionHeader = `
 ╭──────────────────❖
 │ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
 │
 │ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 🎬      
 │
 │ _1.1_ *ꜱᴅ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
 │ _1.2_ *ʜᴅ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
 │ 
 │ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 🎧
 │
 │ _2.1_ *ᴀᴜᴅɪᴏ*
 │ _2.2_ *ᴅᴏᴄᴜᴍᴇɴᴛ*
 │ _2.3_ *ᴠᴏɪᴄᴇ*
 ╰──────────────────❖
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻
`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
      caption: captionHeader,
      contextInfo: {
        mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363382823666763@newsletter',
            newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
            serverMessageId: 999
        },
        externalAdReply: {
            title: 'MALAKA-MD',
            body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
            mediaType: 1,
            sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
            thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }
}, {quoted: mek});
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) return;
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const from = mek.key.remoteJid;

      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToSentMsg) {
        // React to the user's selection
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, {
            video: { url: video_sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*"}, { quoted: mek });
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, {
            video: { url: video_hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*"}, { quoted: mek });
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `ᴍᴀʟᴀᴋᴀ-ᴍᴅ/TWDL.mp3`,
            caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
            contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }
    }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});

//====================================

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "*`Need URL`*" }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text:"⏳", key: mek.key } });

const Fb = await facebook(q);


    const captionHeader = `
╭──────────────────❖
│ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
│
│ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 🎬      
│
│ _1.1_ *ꜱᴅ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
│ _1.2_ *ʜᴅ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
│ 
│ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 🎧
│
│ _2.1_ *ᴀᴜᴅɪᴏ*
│ _2.2_ *ᴅᴏᴄᴜᴍᴇɴᴛ*
│ _2.3_ *ᴠᴏɪᴄᴇ*
╰──────────────────❖
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻
`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: Fb.result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
  contextInfo: {
    mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363382823666763@newsletter',
        newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
        serverMessageId: 999
    },
    externalAdReply: {
        title: 'MALAKA-MD',
        body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
        mediaType: 1,
        sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
        thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
        renderLargerThumbnail: false,
        showAdAttribution: true
    }
}
}, {quoted: mek});
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
        let data = Fb.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
            await conn.sendMessage(from, {
              video: { url: data.links.SD}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
              contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
              
            }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: data.links.HD}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
              contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: data.links.SD },
              mimetype: "audio/mpeg",
              fileName: `ᴍᴀʟᴀᴋᴀ-ᴍᴅ/FBDL.mp3`,
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
              contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    }
}
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
});

//====================================

cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*`Need url`*")
        m.react('⬇️')
        //fetch data from api  
        let data = await downloadTiktok(q);
     let desc = `
╭──────────────────❖
│ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
│
│ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ ꜰɪʟᴇ 🎬      
│
│ _1_ *ꜱᴅ* ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
│ _2_ *ʜᴅ* ᴠɪᴅᴇᴏ ꜰɪʟᴇ 📽️*
│ 
│ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ 🎧
│
│ _3_ *ᴀᴜᴅɪᴏ* ᴍᴀʟᴀᴋᴀ-ᴍᴅ*
│ 
╰──────────────────❖
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻
     `

const sentMsg = await conn.sendMessage(from, {
  image: { url: data.result.image}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: desc,
  contextInfo: {
    mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363382823666763@newsletter',
        newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
        serverMessageId: 999
    },
    externalAdReply: {
        title: 'MALAKA-MD',
        body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
        mediaType: 1,
        sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
        thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
        renderLargerThumbnail: false,
        showAdAttribution: true
    }
}
}, {quoted: mek});
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
        let dat = data.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (no wm File)
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_1}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
              contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "Lααɾα-ᴍᴅ ✻",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
             }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_2}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*",
              contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
                   }
           
          else if (messageType === '3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: dat.dl_link.download_mp3 }, mimetype: "audio/mpeg" }, { quoted: mek })  
          }  
        }      
    });

} catch (e) {
console.log(e);
reply(`${e}`);
}
    });

//====================================

cmd({
    pattern: "baiscope",
    react: '📑',
    category: "download",
    desc: "baiscope.lk",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Avatar)*');

        // Construct the search URL
        const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details (title, link, and image)
        $("article.elementor-post").each((index, element) => {
            const title = $(element).find("h5.elementor-post__title > a").text().trim();
            const episodeLink = $(element).find("h5.elementor-post__title > a").attr("href");
            const imgUrl = $(element).find(".elementor-post__thumbnail img").attr("src");

            if (title && episodeLink && imgUrl) {
                episodes.push({
                    title,
                    episodeLink,
                    imgUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `📺 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n🔗 Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,
            { text: info
             }, { quoted: mek });
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Fetch the download link from the selected episode page
                    const episodeResponse = await axios.get(selectedEpisode.episodeLink);
                    const $episodePage = cheerio.load(episodeResponse.data);
                    const downloadLink = $episodePage("a.dlm-buttons-button").attr("href");

                    if (downloadLink) {
                        // Send the image of the selected episode along with the details
                        await conn.sendMessage(from, {
                            image: { url: selectedEpisode.imgUrl },
                            caption: `🎬 *${selectedEpisode.title}*\n🔗 Link: ${selectedEpisode.episodeLink}\n⬇️ Download will follow.`                        
                        }, { quoted: mek });

                        // Download the ZIP file
                        const zipFilePath = path.join(__dirname, 'downloaded_episode.zip');
                        const writer = fs.createWriteStream(zipFilePath);

                        const downloadResponse = await axios({
                            url: downloadLink,
                            method: 'GET',
                            responseType: 'stream'
                        });
downloadResponse.data.pipe(writer);

                        writer.on('finish', async () => {
                            // Once the download is complete, send the ZIP file to the user
                            await conn.sendMessage(from, {
                                document: { url: zipFilePath },
                                mimetype: 'application/zip',
                                fileName: `${selectedEpisode.title}.zip`,
                                caption: `*${selectedEpisode.title}*\n\n> ᴍᴀʟᴀᴋᴀ-ᴍᴅ`,                                
                                contextInfo: {
                                    mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                                    groupMentions: [],
                                    forwardingScore: 1,
                                    isForwarded: true,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterJid: '120363382823666763@newsletter',
                                        newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                                        serverMessageId: 999
                                    },
                                    externalAdReply: {
                                        title: 'MALAKA-MD',
                                        body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                                        mediaType: 1,
                                        sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                                        thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                                        renderLargerThumbnail: false,
                                        showAdAttribution: true
                                    }
                                }
                            }, {quoted: mek});

                            // Optionally delete the downloaded ZIP file after sending
                            fs.unlinkSync(zipFilePath);
                        });

                        writer.on('error', (err) => {
                            console.error('Error downloading ZIP file:', err);
                            reply('*Error downloading the episode ZIP file.*');
                        });

                    } else {
                        await reply('*Download link not found for the selected episode.*');
                    }
                } else {
                    await reply('*Invalid selection. Please choose a valid number.*');
                }
            }
        });

    } catch (error) {
        console.error(error);
        await reply('*An error occurred while scraping the data.*');
    }
});

//============Baiscope========================

cmd({
    pattern: "baiscope",
    react: '📑',
    category: "download",
    desc: "baiscope.lk",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Avatar)*');

        // Construct the search URL
        const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details (title, link, and image)
        $("article.elementor-post").each((index, element) => {
            const title = $(element).find("h5.elementor-post__title > a").text().trim();
            const episodeLink = $(element).find("h5.elementor-post__title > a").attr("href");
            const imgUrl = $(element).find(".elementor-post__thumbnail img").attr("src");

            if (title && episodeLink && imgUrl) {
                episodes.push({
                    title,
                    episodeLink,
                    imgUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `📺 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n🔗 Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,
            { text: info
             }, { quoted: mek });
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Fetch the download link from the selected episode page
                    const episodeResponse = await axios.get(selectedEpisode.episodeLink);
                    const $episodePage = cheerio.load(episodeResponse.data);
                    const downloadLink = $episodePage("a.dlm-buttons-button").attr("href");

                    if (downloadLink) {
                        // Send the image of the selected episode along with the details
                        await conn.sendMessage(from, {
                            image: { url: selectedEpisode.imgUrl },
                            caption: `🎬 *${selectedEpisode.title}*\n🔗 Link: ${selectedEpisode.episodeLink}\n⬇️ Download will follow.`                        
                        }, { quoted: mek });

                        // Download the ZIP file
                        const zipFilePath = path.join(__dirname, 'downloaded_episode.zip');
                        const writer = fs.createWriteStream(zipFilePath);

                        const downloadResponse = await axios({
                            url: downloadLink,
                            method: 'GET',
                            responseType: 'stream'
                        });
downloadResponse.data.pipe(writer);

                        writer.on('finish', async () => {
                            // Once the download is complete, send the ZIP file to the user
                            await conn.sendMessage(from, {
                                document: { url: zipFilePath },
                                mimetype: 'application/zip',
                                fileName: `${selectedEpisode.title}.zip`,
                                caption: `*${selectedEpisode.title}*\n\n> ᴍᴀʟᴀᴋᴀ-ᴍᴅ`,                                
                                contextInfo: {
                                    mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                                    groupMentions: [],
                                    forwardingScore: 1,
                                    isForwarded: true,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterJid: '120363382823666763@newsletter',
                                        newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                                        serverMessageId: 999
                                    },
                                    externalAdReply: {
                                        title: 'MALAKA-MD',
                                        body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                                        mediaType: 1,
                                        sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                                        thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                                        renderLargerThumbnail: false,
                                        showAdAttribution: true
                                    }
                                }
                            }, {quoted: mek});

                            // Optionally delete the downloaded ZIP file after sending
                            fs.unlinkSync(zipFilePath);
                        });

                        writer.on('error', (err) => {
                            console.error('Error downloading ZIP file:', err);
                            reply('*Error downloading the episode ZIP file.*');
                        });

                    } else {
                        await reply('*Download link not found for the selected episode.*');
                    }
                } else {
                    await reply('*Invalid selection. Please choose a valid number.*');
                }
            }
        });

    } catch (error) {
        console.error(error);
        await reply('*An error occurred while scraping the data.*');
    }
});

//====================================

cmd({
  pattern: 'gdrive',
  desc: "To download Gdrive files.",
  react: '🌐',
  category: "download",
  filename: __filename
}, async (message, connection, chat, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    await message.sendMessage(from, {
      react: {
        text: '⬇️',
        key: connection.key
      }
    });

    if (!q) {
      return chat.reply("Please Give Me a valid Link...");
    }

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const downloadUrl = response.data.result.downloadUrl;

    if (downloadUrl) {
      await message.sendMessage(from, {
        react: {
          text: '⬆️',
          key: connection.key
        }
      });

      await message.sendMessage(from, {
        document: {
          url: downloadUrl
        },
        mimetype: response.data.result.mimetype,
        fileName: response.data.result.fileName,
        caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻",
        contextInfo: {
          mentionedJid: ['94704243771@s.whatsapp.net'],
          groupMentions: [],
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363382823666763@newsletter',
            newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
            serverMessageId: 999
          },
          externalAdReply: {
            title: "MALAKA-MD",
            body: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
            mediaType: 1,
            sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
            thumbnailUrl: "https://i.ibb.co/JrdxHSY/3439.jpg",
            renderLargerThumbnail: false,
            showAdAttribution: true
          }
        }
      }, {
        quoted: connection
      });
    }

    await message.sendMessage(from, {
      react: {
        text: '✅',
        key: connection.key
      }
    });
  } catch (error) {
    console.error(error);
  }
});

//====================================

cmd({
    pattern: "fb2",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 await conn.sendMessage(from, { text: '📥 *ᴍᴀʟᴀᴋᴀ-ᴍᴅ ιѕ ᴅᴏᴡɴʟᴏᴅɪɴɢ...* 📥' }, { quoted: mek });


  if (!args[0]) {
    return reply('*`Please give a waild Facebook link`*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`Error obtaining data.`*');
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`No resalt found.`*');
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply('*`Error data loss.`*');
  }

  if (!data) {
    return reply('*`No data found.`*');
  }

  await m.react('✅');
  let video = data.url;
  let dev = '© 2024 𝘔𝘢𝘭𝘢𝘬𝘢 FB DOWNLOAD HD.'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`Error download video.`*');
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
});

//====================================

cmd({
    pattern: "xvideo",
    alias: ["xvdl","xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
if(xv_list.result.length < 0) return await reply("Not results found !")

const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${xv_list.result[0].url}`)
    
  // FIRST VIDEO
  
const msg = `
╭─────────────────❖
│🔞*XVIDEO DOWNLOADER*🔞
╰─────────────────❖
 ──────────────────❖
╭────────────────❖
│ ℹ️ *DARK_ALFHA_MD* 
│
│☍ ⦁ *Title* - ${xv_info.result.title}
│☍ ⦁ *Views* - ${xv_info.result.views}
│☍ ⦁ *Like* - ${xv_info.result.like}
│☍ ⦁ *Deslike* - ${xv_info.result.deslike}
│☍ ⦁ *Size* - ${xv_info.result.size}
╰────────────────❖
──────────────────❖
> ᴍᴀʟᴀᴋᴀ-ᴍᴅ ʙʏ ᴅᴀʀᴋ-ᴀʟꜰʜᴀ-ʙᴏᴛ . . . 👩‍💻
`


await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// XVIDEO
await conn.sendMessage(from, { video: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (error) {
console.log(error)
reply(error)
}
})

//====================================

cmd({
    pattern: "apk2",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: 'Need apk link...' }, { quoted: mek } ) 
const data = await apkdl.download(q)
let listdata = `📚 Name : ${data.name}
📦 Developer : ${data.package}
⬆️ Last update : ${data.lastup}
📥 Size : ${data.size}`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: mek })
//if (data.size.includes('GB')) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
//if (data.size.includes('MB') && data.size.replace(' MB','') > config.MAX_SIZE) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('ERROR !!')
    console.log(e)
}
})

//xvideo

cmd({
  pattern: 'pussybdl',
  alias: ["dlpussyb", "pussybdown", "hentaivid"],
  desc: "Download adult videos from pussyboy.net.",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (bot, message, context, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  query,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    // React to the message with an emoji
    await context.react('🔞');

    // Construct the video URL
    const videoUrl = "https://www.pussyboy.net/porn/" + query + '/';

    // Fetch the webpage
    const response = await fetch(videoUrl);
    const html = await response.text();

    // Parse the HTML content
    const $ = cheerio.load(html);

    // Extract the video source URL
    const videoSource = $("body > div.container-xxl.videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div > video > source").attr("src");

    // Send the video as a message
    await bot.sendMessage(from, {
      video: { url: videoSource },
      mimetype: "video/mp4",
      caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳 𝚅1💕⃟*"
    }, { quoted: message });
  } catch (error) {
    // Log the error and reply with the error message
    console.error(error);
    reply('Error: ' + error.message);
  }
});

//====================================

const { sinhalaSub } = require('mrnima-moviedl'); // Make sure mrnima-moviedl is installed and supports search

cmd({
    pattern: "movie1",
    alias: ["sinhalasub1"],
    react: '📑',
    category: "download",
    desc: "Search movies on sinhalasub and get download links",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Deadpool)*');
        
        var movie = await sinhalaSub();
        const results = await movie.search(q);
        const searchResults = results.result.slice(0, 10);
        
        if (!searchResults || searchResults.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `🔢 *Please reply with the number you want to select*\n\n📽️ *Search Results for* "${q}":\n\n`;
        searchResults.forEach((result, index) => {
            resultsMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage, 
            contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;
            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {
                    const selectedMovie = searchResults[selectedNumber - 1];

                    const apiUrl = `https://api-site-2.vercel.app/api/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
                    try {
                        const response = await axios.get(apiUrl);
                        const movieData = response.data.result;

                        // Only use `dl_links1` for PixelDrain links
                        const pixelDrainLinks = movieData.dl_links || [];
                        if (pixelDrainLinks.length === 0) {
                            return await reply('No PixelDrain links found.');
                        }

                        let downloadMessage = `🔢 *Please reply with the number you want to select*\n\n🎥 *${movieData.title}*\n\n`;
                        downloadMessage += `*Available PixelDrain Download Links:*\n`;

                        pixelDrainLinks.forEach((link, index) => {
                            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n🔗 Link: ${link.link}\n\n`;
                        });

                        const pixelDrainMsg = await conn.sendMessage(from, { text: downloadMessage,
                            contextInfo: {
                                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                                groupMentions: [],
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363382823666763@newsletter',
                                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                                    serverMessageId: 999
                                },
                                externalAdReply: {
                                    title: 'MALAKA-MD',
                                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                                    mediaType: 1,
                                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                                    renderLargerThumbnail: false,
                                    showAdAttribution: true
                                }
                            }
                     }, {quoted: replyMek});
                        const pixelDrainMessageID = pixelDrainMsg.key.id;

                        conn.ev.on('messages.upsert', async (pdUpdate) => {
                            const pdReply = pdUpdate.messages[0];
                            if (!pdReply.message) return;
                            const pdMessageType = pdReply.message.conversation || pdReply.message.extendedTextMessage?.text;
                            const isReplyToPixelDrainMsg = pdReply.message.extendedTextMessage && pdReply.message.extendedTextMessage.contextInfo.stanzaId === pixelDrainMessageID;

                            if (isReplyToPixelDrainMsg) {
                                const qualityNumber = parseInt(pdMessageType.trim());
                                if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= pixelDrainLinks.length) {
                                    const selectedPixelDrainLink = pixelDrainLinks[qualityNumber - 1];
                                    const fileId = selectedPixelDrainLink.link.split('/').pop();
                                    await conn.sendMessage(from, { react: { text: '⬇️', key: pixelDrainMsg.key } });
                                    conn.sendMessage(from, { text: "*Downloading your movie...\n\n*Wait few minits...*\n\n© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ" }, { quoted: mek });

                                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;

                                    await conn.sendMessage(from, { react: { text: '⬆', key: pixelDrainMsg.key } });

                                    await conn.sendMessage(from, {
                                        document: { url: directDownloadUrl },
                                        mimetype: "video/mp4",
                                        fileName: `${movieData.title} - ${selectedPixelDrainLink.quality}.mp4`,
                                        caption: `${movieData.title}\nQuality: ${selectedPixelDrainLink.quality}\n*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ*`,
                                        contextInfo: {
                                            mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                                            groupMentions: [],
                                            forwardingScore: 1,
                                            isForwarded: true,
                                            forwardedNewsletterMessageInfo: {
                                                newsletterJid: '120363382823666763@newsletter',
                                                newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                                                serverMessageId: 999
                                            },
                                            externalAdReply: {
                                                title: 'MALAKA-MD',
                                                body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                                                mediaType: 1,
                                                sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                                                thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                                                renderLargerThumbnail: false,
                                                showAdAttribution: true
                                            }
                                        }
                                 }, {quoted: mek});

                                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                                } else {
                                    await reply('Invalid selection. Please reply with a valid number.');
                                }
                            }
                        });

                    } catch (error) {
                        console.error('Error fetching movie details:', error);
                        await reply('An error occurred while fetching movie details. Please try again.');
                    }
                } else {
                    await reply('Invalid selection. Please reply with a valid number.');
                }
            }
        });

    } catch (error) {
        console.error('Error during search:', error);
        reply('*An error occurred while searching!*');
    }
});

//====================================
	
cmd({
    pattern: "movie2",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎞️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("! Movie not found.");
        }

        const movieInfo = `
*🎬 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳💕⃟* 🎬*

*ᴛɪᴛʟᴇ:* ${data.Title}
*ʏᴇᴀʀ:* ${data.Year}
*ʀᴀᴛᴇᴅ:* ${data.Rated}
*ʀᴇʟᴇᴀꜱᴇᴅ:* ${data.Released}
*ʀᴜɴᴛɪᴍᴇ:* ${data.Runtime}
*ɢᴇɴʀᴇ:* ${data.Genre}
*ᴅɪʀᴇᴄᴛᴏʀ:* ${data.Director}
*ᴡʀɪᴛᴇʀ:* ${data.Writer}
*ᴀᴄᴛᴏʀꜱ:* ${data.Actors}
*ʟᴀɴɢᴜᴀɢᴇ:* ${data.Language}
*ᴄᴏᴜɴᴛʀʏ:* ${data.Country}
*ᴀᴡᴀʀᴅꜱ:* ${data.Awards}
*ɪᴍᴅʙ ʀᴀᴛɪɴɢ:* ${data.imdbRating}

> POWERED BY 🧚‍♂️⃝𝙼𝙰𝙻𝙰𝙺𝙰-𝙼𝙳💕⃟*
`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> CREATED BY MALAKA-MD`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

//====================================

cmd({
  pattern: 'ig',
  desc: "To download Instagram videos.",
  react: '🎥',
  category: 'download',
  filename: __filename
}, async (client, message, chat, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) {
      return chat.reply("Please provide a valid link...");
    }
    chat.react('⬇️');
    let downloadData = await igdl(q);
    let videoData = await downloadData.data;

    for (let i = 0; i < 20; i++) {
      let video = videoData[i];
      let videoUrl = video.url;
      chat.react('⬆️');
      await client.sendMessage(from, {
        video: {
          url: videoUrl
        },
        mimetype: "video/mp4",
        caption: "> © ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👨‍💻",
        contextInfo: {
          mentionedJid: ["94704243771@s.whatsapp.net"],
          groupMentions: [],
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363382823666763@newsletter',
            newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
            serverMessageId: 999
          },
          externalAdReply: {
            title: "MALAKA-MD",
            body: "ᴍᴀʟᴀᴋᴀ",
            mediaType: 1,
            sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
            thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg',
            renderLargerThumbnail: false,
            showAdAttribution: true
          }
        }
      }, {
        quoted: message
      });
      chat.react('✅');
    }
  } catch (error) {
    console.log(error);
  }
});

// Command registration for downloading songs

cmd({
  'pattern': "ytmp3",
  'alias': "ytsong",
  'desc': "To download songs.",
  'react': '🎵',
  'category': "download",
  'filename': __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply, q }) => {
  try {
    // Check if message contains a valid URL or title
    if (!q) {
      return reply("Please give me a URL or title.");
    }

    
    const searchResults = await yts(q);
    const video = searchResults.videos[0]; // Get the first video

    // Extract video information
    const videoUrl = video.url;
    const videoThumbnail = video.thumbnail;
    const videoTitle = video.title;
    const videoDuration = video.timestamp;
    const videoViews = video.views;
    const videoUploadTime = video.ago;

    // Prepare the message to send
    let messageText = `
   ┏┻━━━━━━━━━━━━━
   ┃*ᴍᴀʟᴀᴋᴀ-ᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ*
   ┗━━━━━━━━━━━━━━
   ╭────────────────❖
   │ ℹ️ *MALAKA-MD* 
   │
   │☍ ⦁ *Title:* ${video.title} 
   │☍ ⦁ *Duration:* ${video.timestamp}
   │☍ ⦁ *Views:* ${video.views}   
   │☍ ⦁ *Uploaded On:* ${video.ago} 
   ╰────────────────❖
   ❖──────────────────❖
   ╭──────────────────❖
   │ © 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢
   │
   │ *_1_*  ᴀᴜᴅɪᴏ ꜰɪʟᴇ 🎶
   │──────────────────❖
   │ *_2_*  ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ 📂
⁠⁠⁠⁠   ╰──────────────────❖
  © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ . . . 👩‍💻`;

    // Send the message with the thumbnail and download options
    const vv = await conn.sendMessage(from, {
      'image': {
        'url': videoThumbnail
      },
      'caption': messageText,
      'contextInfo': {
        'mentionedJid': ["94704243771@s.whatsapp.net"],
        'groupMentions': [],
        'forwardingScore': 1,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363382823666763@newsletter",
          'newsletterName': "ᴍᴀʟᴀᴋᴀ-ᴍᴅ ",
          'serverMessageId': 999
        },
        'externalAdReply': {
          'title': "MALAKA-MD",
          'body': "ᴍᴀʟᴀᴋᴀ",
          'mediaType': 1,
          'sourceUrl': "https://github.com/Malaka-KG/MALAKA-MD-V1",
          'thumbnailUrl': "https://i.ibb.co/JrdxHSY/3439.jpg",
          'renderLargerThumbnail': false,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': mek
    });

    const downloadData = await fetchJson(`https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`);
        const downloadUrl = downloadData.result.download_url;

    // Handle the user's reply for download format
            conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        
           
        
          await conn.sendMessage(from, {
            'audio': {
              'url': downloadUrl
            },
            'mimetype': "audio/mpeg",
            'contextInfo': {
              'mentionedJid': ["94704243771@s.whatsapp.net"],
              'groupMentions': [],
              'forwardingScore': 1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': '120363382823666763@newsletter',
                'newsletterName': "ᴍᴀʟᴀᴋᴀ-ᴍᴅ ",
                'serverMessageId': 999
              },
              'externalAdReply': {
                'title': "MALAKA-MD",
                'body': "ᴍᴀʟᴀᴋᴀ",
                'mediaType': 1,
                'sourceUrl': videoUrl,
                'thumbnailUrl': videoThumbnail,
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': mek
          });

          
                 
                        
                        break;  
                       case '2': 
          await conn.sendMessage(from, {
            'document': {
              'url': downloadUrl
            },
            'mimetype': "audio/mpeg",
            'fileName': videoTitle + '.mp3',
            'caption': "\n*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👨‍💻*\n ",
            'contextInfo': {
              'mentionedJid': ["94704243771@s.whatsapp.net"],
              'groupMentions': [],
              'forwardingScore': 1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': '120363382823666763@newsletter',
                'newsletterName': "ᴍᴀʟᴀᴋᴀ-ᴍᴅ ",
                'serverMessageId': 999
              },
              'externalAdReply': {
                'title': "MALAKA-MD",
                'body': "ᴍᴀʟᴀᴋᴀ",
                'mediaType': 1,
                'sourceUrl': videoUrl,
                'thumbnailUrl': videoThumbnail,
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': mek
          });
          }}});



  } catch (error) {
    console.log(error);
    reply('' + error);
  }
});

//====================================

const tiktokCommand = {
  pattern: "tiktoksearch",
  alias: ["tiktoks", "tiks"],
  desc: "Search TikTok videos",
  use: "<query>",
  category: "search",
  react: '📱',
  filename: __filename
};

cmd(tiktokCommand, async (sendMessage, message, args, context) => {
  const { from, quoted, body, isCmd, command, args: commandArgs, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply } = context;

  const promptMessage = { text: "[❗] What do you want to search on TikTok?" };
  const quotedMessage = { quoted: message };

  if (!q) {
    return sendMessage(from, promptMessage, quotedMessage);
  }

  try {
    let searchResult = await tiktokSearch(q);
    if (!searchResult.status) {
      throw new Error(searchResult.result);
    }
    let results = searchResult.result;
    shuffleArray(results);
    let topResults = results.slice(0, 7);
    let videoMessages = await Promise.all(topResults.map(video => createVideoMessage(video.videoUrl, sendMessage)));

    const headerMessage = { text: '' };
    const footerMessage = { text: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ" };
    const buttonOptions = { buttons: [] };

    let interactiveMessages = videoMessages.map((videoMessage, index) => ({
      body: proto.Message.InteractiveMessage.Body.fromObject(headerMessage),
      footer: proto.Message.InteractiveMessage.Footer.fromObject(footerMessage),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: topResults[index].description,
        hasMediaAttachment: true,
        videoMessage: videoMessage
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(buttonOptions)
    }));

    const deviceListMetadata = { deviceListMetadata: {}, deviceListMetadataVersion: 2 };
    const bodyMessage = { text: "*< TIKTOK SEARCH >*\n\n🔎 *Searched text:* " + q + "\n\n📝 *Results obtained:*" };
    const footerText = { text: '' };
    const headerNoMedia = { hasMediaAttachment: false };
    const carouselMessages = { cards: interactiveMessages };
    const quotedReply = { quoted: message };

    const finalMessage = generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: deviceListMetadata,
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create(bodyMessage),
            footer: proto.Message.InteractiveMessage.Footer.create(footerText),
            header: proto.Message.InteractiveMessage.Header.create(headerNoMedia),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject(carouselMessages)
          })
        }
      }
    }, quotedReply);

    await sendMessage.relayMessage(from, finalMessage.message, { messageId: finalMessage.key.id });
  } catch (error) {
    const errorMessage = { quoted: message };
    await sendMessage(from, { text: error.toString() }, errorMessage);
  }
});

async function tiktokSearch(query) {
  try {
    const searchParams = new URLSearchParams({
      keywords: query,
      count: '10',
      cursor: '0',
      HD: '1'
    });

    const response = await axios.post("https://tikwm.com/api/feed/search", searchParams, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        'Cookie': "current_language=en",
        'User-Agent': "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    });

    const videos = response.data.data.videos;

    if (videos.length === 0) {
      return { status: false, result: "No videos found." };
    }

    return {
      status: true,
      result: videos.map(video => ({
        description: video.title ? video.title : "No description",
        videoUrl: video.play ? video.play : "No URL"
      }))
    };
  } catch (error) {
    return { status: false, result: error.message };
  }
}

async function createVideoMessage(videoUrl, sendMessage) {
  try {
    const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
    const videoData = response.data;

    const videoContent = { video: videoData };
    const uploadOptions = { upload: sendMessage.waUploadToServer };

    const { videoMessage } = await generateWAMessageContent(videoContent, uploadOptions);
    return videoMessage;
  } catch (error) {
    throw new Error("Error creating video message: " + error.message);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


cmd({
    pattern: "ytsearch",
    desc: "button test",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    if (!q) return reply(`*Need title*`);
        let search = await yts(q);
        let videos = search.all;
        console.log(videos)
        if (!videos || videos.length === 0) {
          reply('No video found');
          return;
        }
        // Choose between 1 and 5 videos at random
        const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
        const selectedVideos = [];
        while (selectedVideos.length < numVideos) {
          const randomIndex = Math.floor(Math.random() * videos.length);
          const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
          selectedVideos.push(randomVideo);
        }
        let push = [];
        for (let i = 0; i < selectedVideos.length; i++) {
          let video = selectedVideos[i];
          let cap = `Title : ${video.title}`;
          let foot = `© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·`;
          const mediaMessage = await prepareWAMessageMedia({ image: { url: video.thumbnail } }, { upload: conn.waUploadToServer });
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: cap
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: foot
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `Video ${i + 1}`,
              subtitle: '',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  "name": "cta_copy",
                  "buttonParamsJson": `{"display_text":"Copy Url","id":"1234","copy_code":"${video.url}"}`
                }
              ]
            })
          });
        }
        let sadee = `MALAKA-MD`;
        let foot2 = `ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·`;
        const msg = generateWAMessageFromContent(from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: sadee
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: foot2
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: push
                }),
                contextInfo: {
                      mentionedJid: ['94704243771@s.whatsapp.net'], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363382823666763@newsletter',
                      newsletterName: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                      serverMessageId: 143
                    }
                    }
              })
            }
          }
        }, {quoted:mek});
        await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})

//=====================================



cmd({
  pattern: "tiktoksearchs",
  alias: ["tiktokss", "tikss"],
  desc: "Search for TikTok videos using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (message, match, context, { from, args, reply }) => {
  if (!args[0]) {
    return reply("🌸 What do you want to search on TikTok?\n\n*Usage Example:*\n.tiktoksearch <query>");
  }

  const query = args.join(" ");
  await context.react('⌛');

  try {
    reply("🔎 Searching TikTok for: " + query);

    const response = await fetch('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + encodeURIComponent(query));
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      await context.react('❌');
      return reply("❌ No results found for your query. Please try with a different keyword.");
    }

    const results = data.data.slice(0, 7);
    results.sort(() => Math.random() - 0.5);

    for (const result of results) {
      const messageContent = `🌸 *TikTok Video Result*:\n\n*• Title*: ${result.title}\n\n*• Author*: ${result.author || 'Unknown'}\n\n*• Duration*: ${result.duration || "Unknown"}\n\n*• URL*: ${result.link}\n\n`;

      if (result.nowm) {
        await message.sendMessage(from, {
          video: {
            url: result.nowm
          },
          caption: messageContent
        }, {
          quoted: context
        });
      } else {
        reply(`❌ Failed to retrieve video for "${result.title}".`);
      }
    }

    await context.react('✅');
  } catch (error) {
    console.error("Error in TikTokSearch command:", error);
    await context.react('❌');
    reply("❌ An error occurred while searching TikTok. Please try again later.");
  }
});

//====================================

cmd({
    pattern: "song",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*`Need YT_URL or Title`*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
╭──────────────────❖
│ *ᴍᴀʟᴀᴋᴀ-ᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ*
╰──────────────────❖
> ☍ ⦁ *ᴛɪᴛʟᴇ :* ${data.title}
> ☍ ⦁ *ᴅᴜʀᴀᴛɪᴏɴ :* ${data.timestamp}
> ☍ ⦁ *ᴠɪᴇᴡꜱ :* ${data.views}
> ☍ ⦁ *ᴜᴘʟᴏᴀᴅ ᴏɴ :* ${data.ago}

❖──────────────────❖

© 𝙏𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙚𝙣𝙙: 🔢

*_1_* | _ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴜᴅɪᴏ 🎧_
*_2_* | _ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ  📁_
*_3_* | _ᴅᴏᴡɴʟᴏᴀᴅ ᴠᴏɪᴄᴇ 🎤_

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ 👩‍💻
`;
let info = `
*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴀᴋᴀ-ᴍᴅ · · ·👩‍💻*
 `;   
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail},
            caption: desc,
  contextInfo: {
                mentionedJid: ['94704243771@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382823666763@newsletter',
                    newsletterName: "ᴍᴀʟᴀᴋᴀ-ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'MALAKA-MD',
                    body: 'ᴍᴀʟᴀᴋᴀ-ᴍᴅ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Malaka-KG/MALAKA-MD-V1",
                    thumbnailUrl: 'https://i.ibb.co/JrdxHSY/3439.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
     
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

                // React to the upload (sending the file)
                

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downSadee }, 
                        mimetype: "audio/mpeg" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { delete: sentMsg.key });
                
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: downSadee },
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, { delete: sentMsg.key });
                     } else if (messageType === '3') {
                     await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const sadee =  await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${url}`);
                const downSadee = sadee.data.download;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downSadee }, 
                        mimetype: "audio/mpeg" ,
                        ptt: "true" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { delete: sentMsg.key }); 
                }
            }
        });
        
 } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});  
