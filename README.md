# My Discord Library

A lightweight Discord.js-like library using raw Discord API.

## Features

- Gateway v10 (WebSocket)
- REST API
- Events: ready, messageCreate

## Example

```js
const { Client } = require('./src');
const client = new Client({ token: 'BOT_TOKEN', intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.on('ready', () => console.log('Ready!'));
client.on('messageCreate', msg => msg.reply('Hi!'));
client.login();
```