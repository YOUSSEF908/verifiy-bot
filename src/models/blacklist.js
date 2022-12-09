const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  guildId: String,
});

blacklistSchema.statics.addGuild = async function(guildId) {
  const data = await this.findOne({guildId});
  return data? data : await this.create({guildId})
}

const Black = mongoose.model("Blacklist", blacklistSchema);

module.exports = Black;