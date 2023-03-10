const { prefix, embedColor } = require('./src/config');
const { db, token } = require('./src/config.json');
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const events = readdirSync('events');

module.exports.client = client;
SetUp(client);

function SetUp (client) {
  client.commands = new Collection();
  client.languages = (readdirSync('./src/languages')).map(e => e.split('.')[0]);
  client.embedColor = embedColor;

  events.filter(e => e.endsWith('.js')).forEach(event => {
    event = require(`./events/${event}`)(client);
    event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
  });

  events.filter(e => !e.endsWith('.js')).forEach(folder => {
    readdirSync('./events/' + folder).forEach(event => {
      event = require(`./events/${folder}/${event}`)(client);
      event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
    });
  });

  for (let folder of readdirSync('commands').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('commands/' + folder).filter(f => f.endsWith('.js'))) {
      let command = require(`./commands/${folder}/${file}`);
      command.category = folder;
      client.commands.set(command.name, command);
    }
  }
}
  
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (result) => {
  try {
    console.log('connected to database');
    await client.login(token);
  } catch (err) {
    console.error(err);
  } 
}).catch(err => console.error(err));

require('./src/util');
require('./server/index');

module.exports.SetUp = SetUp;