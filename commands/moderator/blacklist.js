const { MessageEmbed } = require("discord.js");
const { messageObject } = require('../../src/util');
const blacklist = require('../../src/models/blacklist');
const { guildId } = require("../../src/config.json")

module.exports = {
    name: 'blacklist',
    aliases: ['black'],
    usages: ['blacklist (id) add', 'blacklist (id) remove', 'blacklist all'],
    examples: ['blacklist 1212323322 add', 'blacklist 1212323322 remove', 'blacklist show'],
    cooldown: 10,
    permissions: ['ADMINISTRATOR'],
    args: true,
    async execute(message, args, client) {
        var replys = client.cmdReplys;

        if (args[0] === guildId)
          message.reply(messageObject({content: replys.notmain}))
        if (args[1] === "add") {
            await blacklist.addGuild(args[0])
            message.reply(messageObject({content: replys.doneADD}))
        } if (args[1] === "remove"){
            const guild = await blacklist.findOne({guildId: args[0]})
            if (!guild) return  message.reply(messageObject({content: replys.doneADD}))
            guild.delete();
            message.reply(messageObject({content: replys.doneREMOVE}))
        }
        else if (args[0] === "all") {
            var array = [];
            const embed = new MessageEmbed().setColor("RANDOM")
            const blacklists = await blacklist.find();
            blacklists.forEach(guild => {
              array.push(guild.guildId)
            });
            array = array.map(e => "__"+e+"__")
            embed.setDescription(array.join("\n\n"));

            message.reply({embeds: [embed]})
        }
    }
}