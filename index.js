exports.Client = require('./src/client.js').Client;
exports.GatewayIntents = require('./src/GatewayIntents.js').GatewayIntents;

exports.Message = require('./src/objects/message.js');
exports.Guild = require('./src/objects/guild.js');

console.log(module.exports);