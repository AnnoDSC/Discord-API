const { Client } = require('../src/client.js');
const GatewayIntents = require('../src/GatewayIntents.js');

console.log(GatewayIntents.ALL);

const client = new Client({
  token: 'you token', // Replace with your actual bot token
  intents: GatewayIntents.ALL,
});

client.on('ready', () => {
  console.log(`🤖 Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  if (message.author.id === client.user.id) return; // Ignore own messages
  console.log('📥 Full message object received:');
  console.log(JSON.stringify(message, null, 2));

  message.reply('Message object logged to console.');

  console.log('📤 ENDING');

  console.log(message.guild.id)
});

client.login();