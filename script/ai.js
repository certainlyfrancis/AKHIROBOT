const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  aliases: ['gpt', 'openai']
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗈𝗇 𝖺 𝗌𝗍𝖺𝗍𝖾𝗆𝖾𝗇𝗍 𝖺𝖿𝗍𝖾𝗋 𝖺𝗂\n\n𝗘𝗫𝗔𝗠𝗣𝗟𝗘: 𝖠𝗂 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗍𝗁𝖾 𝗏𝖺𝗅𝗎𝖾 𝗈𝖿 𝖾𝖽𝗎𝖼𝖺𝗍𝗂𝗈𝗇?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔎 | 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.\n\n${input}`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://openaikey.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
