class Guild {
  constructor(data, client) {
    this.id = data.id;
    this.name = data.name || 'Unknown';
    this.client = client;
  }

  async fetch() {
    const guildData = await this.client.getGuild(this.id);
    Object.assign(this, guildData);
    return this;
  }
}

module.exports = Guild;