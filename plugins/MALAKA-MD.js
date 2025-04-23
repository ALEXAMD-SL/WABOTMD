const fs = require('fs');
const path = require('path');
const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");
let listenerRegistered = false;

const sendWelcomeMessage = async (client, groupId, participants) => {
  try {
    const groupMetadata = await client.groupMetadata(groupId);
    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available.";
    const envVars = await readEnv();

    if (!envVars.WELCOME_SET) {
      throw new Error("WELCOME_SET is not defined in the environment variables.");
    }

    let invisibleSpace = '​'.repeat(4000);
    let messageContent = `\n${envVars.WELCOME_SET}\n\n*Name :*\n${groupName}\n\n*Description :*\n${groupDescription}\n\nᴄ`;
    const mentions = participants.map(participant => '@' + participant.split('@')[0]).join("\n");
    let welcomeMessage = `*Hey 🫂♥️*\n${mentions}\n*Welcome to Group ⤵️*\n${invisibleSpace}${messageContent}`;

    await client.sendMessage(groupId, {
      image: { url: 'https://i.ibb.co/PwTkwNQ/20241209-212640.jpg' },
      caption: welcomeMessage,
      mentions: participants
    });

    await sendGroupRulesAlert(client, participants, groupName, groupDescription);
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
};

const sendGroupRulesAlert = async (client, participants, groupName, groupDescription) => {
  try {
    const envVars = await readEnv();

    if (envVars.WELCOME_ALERT === undefined) {
      throw new Error("WELCOME_ALERT is not defined in the environment variables.");
    }

    if (envVars.WELCOME_ALERT === "true") {
      const alertMessage = `*Hey Dear 🫂❤️*\n\n*Welcome to ${groupName}*\n\n${groupDescription}\n\n*Be sure to read the group description*\n\nꜟᴄ`;

      for (const participant of participants) {
        try {
          if (!participant) {
            continue;
          }

          await client.sendMessage(participant, {
            image: { url: 'https://i.ibb.co/PwTkwNQ/20241209-212640.jpg' },
            caption: alertMessage
          });
        } catch (error) {
          console.error("Error sending message to " + participant + ':', error);
        }
      }
    }
  } catch (error) {
    console.error("Error sending group rules alert:", error);
  }
};

const registerGroupWelcomeListener = client => {
  if (!listenerRegistered) {
    client.ev.on('group-participants.update', async event => {
      const { id: groupId, participants, action } = event;

      if (action === "add" && participants.length > 0) {
        console.log("New participants:", participants);
        await sendWelcomeMessage(client, groupId, participants);
      }
    });
    listenerRegistered = true;
  }
};

cmd({
  on: "body"
}, async (message, connection, responder, { from, body, isOwner }) => {
  try {
    const envVariables = await readEnv();

    if (envVariables.WELCOME === undefined) {
      throw new Error("WELCOME is not defined in the environment variables.");
    }

    if (envVariables.WELCOME === "true") {
      if (isOwner) {
        return;
      }
      registerGroupWelcomeListener(message);
    }
  } catch (error) {
    console.log(error);
    await responder.reply("Error: " + error.message);
  }
});

cmd({
  'on': "body"
}, async (context, event, user, {
  from: sender,
  isOwner: owner
}) => {
  const envConfig = await readEnv();
  if (envConfig.ALLOWS_ONLINE === "false") {
    await context.sendPresenceUpdate("paused", sender);
    return;
  }
});

// Composing (Auto Typing)
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const config = await readEnv();
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); // send typing 
    }
});

cmd({
    on: "body"
  },    
  async (conn, mek, m, { from, body, isOwner }) => {
    if (body.toLowerCase() || text.toLowerCase()) {
              const config = await readEnv();
              if (config.FAKE_RECORDING === 'true') {
                  //if (isOwner) return;        
                  await conn.sendPresenceUpdate('recording', from);
              }      
            }         
  });

//=====================================


cmd({
  'on': 'body'
}, async (message, quotedMessage, key, {
  from: fromId,
  body: messageBody,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = ['wtf', "mia", "xxx", 'fuck', "sex", 'huththa', "pakaya", "ponnaya", 'hutto', 'lol'];
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const lowerCaseMessageBody = messageBody.toLowerCase();
    const containsBadWord = badWords.some(word => lowerCaseMessageBody.includes(word));
    const envConfig = await readEnv();
    if (containsBadWord && envConfig.ANTI_BAD === "true") {
      await message.sendMessage(fromId, {
        'delete': quotedMessage.key
      }, {
        'quoted': quotedMessage
      });
      await message.sendMessage(fromId, {
        'text': "*🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫*",
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
            'sourceUrl': 'https://github.com/Malaka-KG/MALAKA-MD-V1',
            'thumbnailUrl': 'https://raw.githubusercontent.com/Malaka-KG/MALAKA-MD/refs/heads/main/img/IMG-20241215-WA0139.jpg',
            'renderLargerThumbnail': false,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': quotedMessage
      });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});

const linkPatterns = [/https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/];

cmd({
  'on': "body"
}, async (message, quotedMessage, key, {
  from: fromId,
  body: messageBody,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const containsLink = linkPatterns.some(pattern => pattern.test(messageBody));
    const envConfig = await readEnv();
    if (containsLink && envConfig.ANTI_LINK === 'true') {
      await message.sendMessage(fromId, {
        'delete': quotedMessage.key
      }, {
        'quoted': quotedMessage
      });
      await message.sendMessage(fromId, {
        'text': "*⚠️ Links are not allowed in this group*\n@" + sender.split('@')[0] + " has been removed. 🚫",
        'mentions': [sender],
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
            'sourceUrl': 'https://github.com/Malaka-KG/MALAKA-MD-V1',
            'thumbnailUrl': "https://raw.githubusercontent.com/Malaka-KG/MALAKA-MD/refs/heads/main/img/IMG-20241215-WA0139.jpg",
            'renderLargerThumbnail': false,
            'showAdAttribution': true
          }
        }
      }, {
        'quoted': quotedMessage
      });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});


