// @ts-check
const EventEmitter = require('events');
const { startGateway } = require('./gateway');
const { REST } = require('./rest');
const GuildObject = require('./objects/guild');
const { json } = require('stream/consumers');
const { stat } = require('fs');

/**
 * @typedef {import('../types/index').ClientOptions} ClientOptions
 * @typedef {import('../types/index').Message} Message
 * @typedef {import('../types/index').User} User
 * @typedef {import('../types/index').Guild} Guild
 */

class Client extends EventEmitter {
  /**
   * @param {ClientOptions} options
   */
  constructor(options) {
    super();
    this.token = options.token;
    this.intents = options.intents || [];
    this.ws = null;
    /** @type {User|null} */
    this.user = null;
    this._guildCache = new Map();
    this.rest = new REST(this.token);
  }

  login() {
    startGateway(this.token, this.intents, this);
  }

  async sendMessage(channelId, content) {
    return await this.rest.sendMessage(channelId, content);
  }

  async getGuild(guildId) {
    if (this._guildCache.has(guildId)) {
      return this._guildCache.get(guildId);
    }

    const guildData = await this.rest.getGuild(guildId);
    const guild = new GuildObject(guildData, this);
    this._guildCache.set(guildId, guild);
    return guild;
  }
  
  async getChannel(channelId) {
    const channelData = await this.rest.getChannel(channelId);
    return channelData;
  }

  /**
   * Set the client's presence status
   * 
   * @param {'online' | 'dnd' | 'idle' | 'invisible' | 'offline'} status
   */
  async setPresence(status) {
    if (!['online', 'dnd', 'idle', 'invisible', 'offline'].includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    // Check if the WebSocket is ready
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open. Cannot set presence.');
    }

    // Send the presence update as a JSON string
    this.ws.send(JSON.stringify({ op: 3, d: { since: null, activities: [], status: status, afk: false } }));
  }

  /**
   * Set the client's activity
   * 
   * @param {0 | 1 | 2 | 3 | 4 | 5} type - The type of activity
   * @param {string} name - The name or details of the activity
   * @param {string} [emoji] - Optional emoji for custom activities
   */
  async setActivity(type, name, emoji) {
    const activityTypes = {
      0: 'Playing',
      1: 'Streaming',
      2: 'Listening',
      3: 'Watching',
      4: 'Custom',
      5: 'Competing',
    };

    if (!Object.keys(activityTypes).map(Number).includes(type)) {
      throw new Error(`Invalid activity type: ${type}`);
    }

    const activity = { name: name, type: type };
    console.log(activity);

    // Assuming the WebSocket connection supports setting activities
    this.ws.send(JSON.stringify({ op: 3, d: { since: null, activities: [activity], status: 'online', afk: false } }));
  }

  /**
   * Register an event listener
   * 
   * @overload
   * @param {'ready'} event
   * @param {() => void} listener
   * @returns {this}
   *
   * @overload
   * @param {'messageCreate'} event
   * @param {(message: Message) => void} listener
   * @returns {this}
   *
   * @overload
   * @param {'error'} event
   * @param {(err: Error) => void} listener
   * @returns {this}
   *
   * @param {string} event
   * @param {(...args: any[]) => void} listener
   * @returns {this}
   */
  on(event, listener) {
    return super.on(event, listener);
  }
}

module.exports = { Client };
