const fetch = require('node-fetch');


class REST {
  constructor(token) {
    this.token = token;
  }

  async sendMessage(channelId, content) {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });
    return res.json();
  }


  async getGuild(guildId, token) {
    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch guild');
    return await res.json();
  }

  // Funktion zum Abrufen von Channel-Daten
  async getChannel(channelId, token) {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}`, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch channel');
    return await res.json();
  }

  // Funktion zum Abrufen von User-Daten
  async getUser(userId, token) {
    const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  }

  // Funktion zum Abrufen von Messages in einem Channel
  async getMessages(channelId, token, limit = 50) {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages?limit=${limit}`, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch messages');
    return await res.json();
  }

  async getChannel(channelId, token) {
    const res = await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages/${message.id}`, {
      headers: {
        Authorization: `Bot ${this.token}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch messages');
    return await res.json();
  }
}

module.exports = { REST };