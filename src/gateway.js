const WebSocket = require('ws');
const { getGuild } = require('./rest');

function startGateway(token, intents, client) {
  const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
  client.ws = ws;

  let heartbeatInterval;

  ws.on('open', () => console.log('[Gateway] Connecting...'));

  ws.on('message', (data) => {
    const payload = JSON.parse(data);
    const { t, s, op, d } = payload;

    switch (op) {
      case 10:
        heartbeatInterval = d.heartbeat_interval;
        setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), heartbeatInterval);

        ws.send(JSON.stringify({
          op: 2,
          d: {
            token,
            intents,
            properties: {
              os: 'linux',
              browser: 'my_library',
              device: 'my_library'
            }
          }
        }));
        break;

      case 0:
        if (t === 'READY') {
          client.user = d.user;
          client.emit('ready');
        } else if (t === 'MESSAGE_CREATE') {
          const guildId = d.guild_id;

            const message = {
            id: d.id,
            content: d.content,
            channelId: d.channel_id,
            author: d.author,
            raw: d,
            reply: (msg) => {
              return new Promise((resolve, reject) => {
              client.sendMessage(d.channel_id, msg)
                .then((response) => resolve(response.id))
                .catch(reject);
              });
            },

            // 👇 Dynamic getter for message.guild
            get guild() {
              if (!guildId) return null;
              if (!client._guildCache) client._guildCache = new Map();

              if (client._guildCache.has(guildId)) {
              return client._guildCache.get(guildId);
              }

              const placeholder = { id: guildId, name: 'Fetching...' };

              getGuild(guildId, client.token).then((guild) => {
              client._guildCache.set(guildId, guild);
              }).catch(console.error);

              return placeholder;
            }
            };

          client.emit('messageCreate', message);
        }
        break;
    }
  });

  ws.on('error', (err) => {
    console.error('[Gateway] WebSocket Error:', err);
    client.emit('error', err);
  });
}

module.exports = { startGateway };
