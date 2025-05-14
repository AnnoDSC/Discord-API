const { Client } = require('../index');
const GatewayIntents = require('../src/GatewayIntents.js');

const client = new Client({
  token: 'you-token',
  intents: GatewayIntents.ALL,
});

client.on('ready', () => {
  console.log(`🤖 Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  let commandName = message.content.split(' ')[0]
  console.log(commandName);
  let args = message.content.split(' ').slice(1).join(' ');
  if (message.author.id === client.user.id) return; // Ignore own messages

  if (commandName === '!set1') {
    client.setActivity(0, args)
    message.reply('Pong!')
  }

  if (commandName === '!set2') {
    client.setPresence("idle")
    message.reply('Pong!1')
  }

  if (message.guild) {
    console.log(message.guild.id);
  }
});

client.login();