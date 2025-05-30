# My Discord Library

A lightweight Discord API wrapper for learning and personal use only. **SO NOT FOR PRODUCTION USE**

## Features

- Gateway v10 (WebSocket)
- REST API
- Events: ready, messageCreate

## Example

```js
const { Client } = require('./index');
const GatewayIntents = require('./src/GatewayIntents.js');

const client = new Client({
  token: 'YOU TOKEN',
  intents: GatewayIntents.ALL,
});

client.on('ready', () => {
  console.log(`🤖 Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  // Split the command into two variables
  let commandName = message.content.split(' ')[0]
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
});

client.login();
```