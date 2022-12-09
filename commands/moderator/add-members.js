const { messageObject } = require('../../src/util');
const { token } = require("../../src/config.json");
const Users = require('../../src/models/users');
const DiscordOauth2 = require("discordouth3");
const auth = new DiscordOauth2();

module.exports = {
    name: 'add-member',
    aliases: ['add-members'],
    usages: ['add-member'],
    examples: ['add-member'],
    cooldown: 10,
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, client) {
        var replys = client.cmdReplys;

        const role = await message.guild.roles.cache.find(role => role.name === "verified")
        const users = await Users.find();
        await users.forEach(async user => {
            const guildBans = await guild.bans.fetch();
            const banned = guildBans.get(user.userId);
            if (!banned) {
            auth.addMember({ guildId: message.guild.id, botToken: token,
                             userId: user.userId , accessToken: user.accessToken, 
                             roles: [role.id]
            }).catch(e => 404)     
         }
        })
        message.reply(messageObject({content: "done"}))
    
    }
}

