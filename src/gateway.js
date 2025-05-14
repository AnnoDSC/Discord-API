const WebSocket = require('ws');
const { getGuild } = require('./rest');
const Message = require('./objects/message');
const Guild = require('./objects/guild');

function startGateway(token, intents, client) {
  const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
  client.ws = ws;

  let heartbeatInterval;

  ws.on('open', () => console.log('[Gateway] Connecting...'));

  ws.on('message', (data) => {
    const payload = JSON.parse(data.toString());
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
          const message = new Message(d, client);
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

module.exports = { startGateway }