const express = require('express');
const app = express.Router();

app.get("/", (req, res) => {
  res.render("login/main.ejs")
})

app.get("/", (req, res) => {
  res.render("login/main.ejs")
})

module.exports = app