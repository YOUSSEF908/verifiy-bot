const express = require("express");
const passport = require("passport");
const axios = require("axios");
const DiscordOauth2 = require("discordouth3");
const refresh = require("passport-oauth2-refresh");
const DiscordStrategy = require("passport-discord").Strategy;
const { client } = require("../index"); 
const Users = require("../src/models/users");
const Black = require("../src/models/blacklist");
const { clientId, clientSecret, callbackURL, channelId, guildId, token } = require("../src/config.json");
const app = express();
const oauth = new DiscordOauth2()

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

const Strategy = new DiscordStrategy({
    clientID: clientId,
    clientSecret,
    callbackURL,
    scope: scopes
}, async (accessToken, refreshToken, profile, cb) => {
    Users.setUser(accessToken, refreshToken, profile, cb);

    const guild = await client.guilds.cache.get(guildId);
    if (!guild) return;
    const guildBans = await guild.bans.fetch();
    const stats = guildBans.get(profile.id);
    if (stats) return;
    const blacklist = await Black.find();
    const channel = await guild.channels.cache.get(channelId);
    if (!channel) return;
    const user = await guild.members.cache.get(profile.id);
    const role = await guild.roles.cache.find(role => role.name === "verified");
    if (!user) await oauth.addMember({ guildId: guild.id,  botToken: token, userId: profile.id, accessToken, roles: [role.id] }).then(async() => {
        const newuser = await guild.members.fetch(profile.id).then(d => d).catch(e => 404)
        if (newuser === 404) return
        blacklist.forEach(async g => {
            const found = await profile.guilds.find(d => d.id === g.guildId);
            if (found) return newuser.send({content: "الرجاء الخروج من مجوعه اسمها " + found.name + " لتفعيل حسابك"})
        });
        newuser.roles.remove(role.id).catch(e => 404)
    }).catch(e => 404)
})

passport.use(Strategy);
refresh.use(Strategy);
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/server/login'));


app.get("/auth/discord", passport.authenticate("discord", { permissions: 66321471 }));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/')
});

app.use(require("./routes/home"))


app.listen(8080, () => {
 console.log("your server is ready and listing to port \"%s\" ", 8080)
})
// by ziad