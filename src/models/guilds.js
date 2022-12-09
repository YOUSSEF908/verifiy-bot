const mongoose = require('mongoose');

const guildsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  verificationId: String,
  language: String,
  prefix: String,
});

guildsSchema.statics.setLanguage = async function (guildId, language) {
  let oldData = await this.findOne({ guildId });
  if (language) language = language.toLowerCase();
  if (oldData) {
    oldData.language = language;
    return await oldData.save();
  } else {
    return await this.create({ guildId, language });
  }
}

guildsSchema.statics.setPrefix = async function (guildId, prefix) {
  let oldData = await this.findOne({ guildId });
  if (oldData) {
    oldData.prefix = prefix;
    return await oldData.save();
  } else {
    return await this.create({ guildId, prefix });
  }
}

guildsSchema.statics.setverificationId = async function (guildId, verificationId) {
  let oldData = await this.findOne({ guildId });
  if (oldData) {
    oldData.verificationId = verificationId;
    return await oldData.save();
  } else {
    return await this.create({ guildId, verificationId });
  }
}

const Guilds = mongoose.model("Guilds", guildsSchema);

module.exports = Guilds;