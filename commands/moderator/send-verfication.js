const { MessageActionRow, MessageButton } = require('discord.js');
const { messageObject } = require('../../src/util');
const Guilds = require('../../src/models/guilds');
const { channelId, guildId, url } = require("../../src/config.json");

module.exports = {
  name: 'send-verification',
  usages: ['send-verification'],
  examples: ['send-verification'],
  aliases: ["verification"],
  permissions: ['ADMINISTRATOR'],
  cooldown: 10,
  async execute (message, args, client) {
    const replys = client.cmdReplys;
    
    if (!guildId) 
      return message.reply(messageObject({content: replys.missingGuildId}));
    if (!channelId) 
      return message.reply(messageObject({content: replys.missingId}));
    const channel = await client.channels.cache.find(({id}) => id === channelId);
    if (!channel) 
     return message.reply(messageObject({content: replys.invalidId}));
    const guild = await client.guilds.cache.get(guildId);
    if (!guild)
     return message.reply(messageObject({content: replys.invalidGId}));
    
     let role = await guild.roles.cache.find(role => role.name === "verified")
     if (!role) 
      role = await guild.roles.create({ name: 'verified', permissions: [] });

    const row = new MessageActionRow().addComponents(
        new MessageButton()
         .setLabel("✅ verification")
         .setStyle("LINK")
         .setURL(url)
    );
    
    const content = `**يرجي تفعيل حسابك في سيرفرنا \`${guild.name}\`\nعند تفعيل حسابك يمكنك رؤيه جميع الرومات\nل تسجيل الدخول يرجي الضغط علي الزر\nverification**`;
    channel.send({content, components: [row]}).then((verificationMessage) => {
        Guilds.setverificationId(guild.id, verificationMessage.id);
        message.reply(messageObject({content: replys.done}));
    });

    await guild.channels.cache.forEach(async channel => {
      if (channel.id !== channelId)  {
        channel.permissionOverwrites.edit(guild.id, { VIEW_CHANNEL: false });
        channel.permissionOverwrites.edit(role, { VIEW_CHANNEL: true });
      }
      if (channel.id === channelId) channel.permissionOverwrites.edit(role, { VIEW_CHANNEL: false });
    });

  }
}