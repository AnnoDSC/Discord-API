class Channel {
  constructor(data, client) {
    this.id = data.id;
    this.name = data.name || 'Unknown';
    this.client = client;
  }

  async fetch() {
    const channelName = await this.client.getChannel(this.id);
    Object.assign(this, channelName);
    return this;
  }
}

module.exports = Guild;