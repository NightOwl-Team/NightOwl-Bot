
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Discord = require("discord.js");
const { escapeRegex } = require("../../handlers/functions");
const db = require("quick.db");
//here the event starts
module.exports = async (client, message) => {
  try {

    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();

    //if the message is not from a bot
    if (message.author.bot) return;

    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    //if message is shorter thaan 4 dont give xp
    if (message.content.length < 4) return;

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
    let nextLevel = Math.floor(5 * Math.pow(level, 2) + 69 * level);
    //add random xp to the user (between 1 and 4)
    xp = xp + Math.floor(Math.random() * (4 - 1 + 1)) + 1;

    //add the random xp to the user 

    db.set(`userData.${message.author.id}.${message.guild.id}.xp`, xp);
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


    // anty invite 
    if (message.content.includes("discord.gg")) {
      message.delete();
      message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`🚫 | Zabronione!`)
        .setDescription(`**${message.author.username}** próbuje wysłać link do serwera!`)
        .setFooter(`Zablokowane Przez NightOwl | ${message.author.username}`, message.author.displayAvatarURL())
      ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
    }



    //get the current prefix from the botconfig/config.json
    let prefix;
    let prefixes = db.fetch("prefix_", message.guild.id);
    if (prefixes == null) {
      prefix = config.prefix;
    } else {
      prefix = prefixes;
    }


    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Ktoś mnie wspomniał? :thinking:`)
          .setDescription(`No cóż w takim razie udziele ci pomocy użyj tej komendy aby zobaczyc ich liste: \`${prefix}help\``)
        );
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
      if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now(); //get the current time
      const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
      const cooldownAmount = (command.cooldown || config.defaultCommandCooldown) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
      if (timestamps.has(message.author.id)) { //if the user is on cooldown
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) { //if he is still on cooldonw
          const timeLeft = (expirationTime - now) / 1000; //get the lefttime
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ Poczekaj ${timeLeft.toFixed(1)} sekund, zanim uruchomisz komende \`${command.name}\` ponownie`)
          ); //send an information message
        }
      }
      timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        //try to delete the message of the user who ran the cmd
        try { message.delete(); } catch { }
        //if Command has specific permission return error
        if (command.memberpermissions && !message.member.hasPermission(command.memberpermissions, { checkAdmin: command.adminPermOverride, checkOwner: command.adminPermOverride })) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command!")
            .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
          ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
        }
        //if the Bot has not enough permissions return error
        let required_perms = ["ADD_REACTIONS", "PRIORITY_SPEAKER", "VIEW_CHANNEL", "SEND_MESSAGES",
          "EMBED_LINKS", "CONNECT", "SPEAK", "DEAFEN_MEMBERS", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS"]
        if (!message.guild.me.hasPermission(required_perms)) {
          try { message.react("❌"); } catch { }
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | Nie mam wystarczających uprawnień!")
            .setDescription("Prosze daj mi uprawnienie ADMINISTRATOR lub jezeli nie chesz tu jest lista permisji które musze mieć: \n> `" + required_perms.join("`, `") + "`")
          )
        }
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      } catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
      }
    }
    else
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Nieznana komenda, spróbój: **\`${prefix}help\`**`)
        .setDescription(`Jeżeli potrzebujesz pomocy w wybranej komendzie, wpisz \`${prefix}help [command name]\``)
      ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
  } catch (e) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`❌ ERROR | Wystapil blad`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }



  //XP System




}
