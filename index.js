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
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
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

client.on("message", async message => {

  //if the message is not from a bot
  if (message.author.bot) return;

  //if the message is not in a guild (aka in dms), return aka ignore the inputs
  if (!message.guild) return;

  //check if the user is in the database
  if (!db.has(`userData.${message.author.id}.${message.guild.id}.xp`)) {
    db.set(`userData.${message.author.id}.${message.guild.id}.xp`, 0);
    db.set(`userData.${message.author.id}.${message.guild.id}.level`, 1);
  }
  //get the xp of the user
  let xp = db.get(`userData.${message.author.id}.${message.guild.id}.xp`);
  //get the level of the user
  let level = db.get(`userData.${message.author.id}.${message.guild.id}.level`);
  //get the amount of xp needed to get to the next level
  let nextLevel = Math.floor(5 * Math.pow(level, 2) + 50 * level);
  //add random xp to the user (between 1 and 13)
  let randomXp = Math.floor(Math.random() * 13) + 1;
  //add the random xp to the user 
  xp = xp + randomXp;
  //if the user has enough xp to get to the next level
  if (xp >= nextLevel) {

    //add 1 to the level
    level = level + 1;
    //set the new level
    db.set(`userData.${message.author.id}.${message.guild.id}.level`, level);
    //set the new xp
    db.set(`userData.${message.author.id}.${message.guild.id}.xp`, xp - nextLevel);
    //send a message to the user
    message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`✅ | Gratulacje!`)
      .setDescription(`**${message.author.username}** otrzymuje **${level}** poziom!`)
    ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
  }



});



client.login(require("./botconfig/config.json").token);


