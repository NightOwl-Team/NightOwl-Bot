//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
const db = require("quick.db"); //this is the database wrapper, which we use to get our database stuff


//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//login into the bot
client.on("message edit", async (oldMessage, newMessage) => {
  //create antyinvite system
  if (newMessage.content.includes("discord.gg")) {
    if (newMessage.member.hasPermission("MANAGE_MESSAGES")) return;
    if (newMessage.author.bot) return;
    if (newMessage.channel.type === "dm") return;
    if (newMessage.content.includes("discord.gg")) {
      newMessage.delete();
      newMessage.channel.send(new Discord.MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`🚫 | Zabronione!`)
        .setDescription(`**${newMessage.author.username}**, nie możesz reklamować innych serwerów!`)
      );
    }
  }
});





client.login(require("./botconfig/config.json").token);


