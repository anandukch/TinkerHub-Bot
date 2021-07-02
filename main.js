const dotenv = require("dotenv");
const fs = require("fs");
const express=require('express');
const Discord = require("discord.js");

dotenv.config();
var app = express();
const port=process.env.PORT ?? 3000;

app.listen(port,()=>{

  console.log("listening")
})
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const prefix = "!";

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("bot ready");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "reactionrole") {
    client.commands.get("reactionrole").execute(message, args, Discord, client);
  }
});

client.login(process.env.TOKEN);
