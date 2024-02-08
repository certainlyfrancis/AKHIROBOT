const axios = require('axios');

module.exports.config = {
  name: 'nica',
  version: '1.0.0',
  credits: '𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅',
  description: '𝗡𝗜𝗖𝗔 𝗂𝗌 𝖺𝗇 𝖠𝗋𝗍𝗂𝖿𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 ( 𝖠𝖨 ) 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗈𝖿 𝖫𝗂𝖺𝗇𝖾 𝖢𝖺𝗀𝖺𝗋𝖺 𝖿𝗋𝗈𝗆 𝖫𝗂𝖺𝗌𝗉𝖺𝗋𝗄 𝖠𝖨 𝗍𝗁𝖺𝗍 𝖼𝖺𝗇 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖺𝗌𝗌𝗂𝗀𝗇𝗆𝖾𝗇𝗍𝗌.',
  usage: '[ 𝖯𝗋𝗈𝗆𝗉𝗍 | 𝖰𝗎𝖾𝗋𝗒 ]',
  role: 0
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ').trim();
  
  if (!input) {
    api.sendMessage(`ℹ️ | Please provide a question or statement after the command.\n\nExample: nica what is the value of education?`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔎 | Searching for the answer to "${input}"`, event.threadID, event.messageID);
  
  try {
    const encodedInput = encodeURIComponent(input);
    const response = await axios.get(`https://lianeapi.onrender.com/ask/nica?key=j86bwkwo-8hako-12C&prompt=${encodedInput}`);
    
    if (response.data && response.data.message) {
      api.sendMessage(response.data.message, event.threadID, event.messageID);
    } else {
      throw new Error('Response is empty or missing data');
    }
  } catch (error) {
    console.error('Error fetching answer:', error.message);
    let errorMessage = '🔴 | An error occurred while processing your request.';
    
    if (error.response && error.response.status === 404) {
      errorMessage = '🔴 | No response found for the provided query.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '🔴 | The request timed out. Please try again later.';
    }
    
    api.sendMessage(errorMessage, event.threadID, event.messageID);
  }
};
