class Message {
  constructor(data, client) {
    this.id = data.id;
    this.content = data.content;
    this.channelId = data.channel_id;
    this.author = data.author;
    this.guildId = data.guild_id;
    this.client = client;
  }

  async reply(content) {
    return await this.client.sendMessage(this.channelId, content);
  }

  get guild() {
    if (!this.guildId) return null;
    if (!this.client._guildCache) this.client._guildCache = new Map();

    if (this.client._guildCache.has(this.guildId)) {
      return this.client._guildCache.get(this.guildId);
    }

    const placeholder = { id: this.guildId, name: 'Fetching...' };
    this.client.getGuild(this.guildId).then((guild) => {
      this.client._guildCache.set(this.guildId, guild);
    }).catch(console.error);

    return placeholder;
  }
}

module.exports = Message;