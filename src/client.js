const WebSocket = require('ws');
const EventEmitter = require('events');
const { startGateway } = require('./gateway');
const { sendMessage } = require('./rest');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.token = options.token;
    this.intents = options.intents || [];
    this.ws = null;
    this.user = null;
  }

  login() {
    console.log(this.intents)
    startGateway(this.token, this.intents, this);
  }

  async sendMessage(channelId, content) {
    return await sendMessage(this.token, channelId, content);
  }
}

module.exports = { Client };