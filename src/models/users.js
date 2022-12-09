const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: String,
  accessToken: String,
  refreshToken: String,
  email: String,
  username: String
});

usersSchema.statics.setUser = async function (accessToken, refreshToken, profile, cb)  {
    let userData = await this.findOne({userId: profile.id});
    if (!userData) {
      await this.create({userId: profile.id, username: profile.username, email: profile.email, accessToken, refreshToken});
      cb("done", "done")
    }
     else {
    userData.username = profile.username;
    userData.accessToken = accessToken;
    userData.refreshToken = refreshToken;
    userData.email = profile.email;
    userData.save();
    cb("done", "done");
    }
}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;