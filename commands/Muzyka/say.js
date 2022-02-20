const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const ytdl = require('ytdl-core');
module.exports = {
  name: "play",
  category: "Muzyka",
  aliases: ["p"],
  cooldown: 2,
  usage: "play <name of song>",
  description: "puszcza piosenke szczylu",
  run: async (client, message, args, user, text, prefix) => {
    try {
      //create muscic commands like play, pause, stop, resume, skip, etc.
      //get args and slice them to get the name of the song

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Nie podales nazwy piosenki`)
        );
      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Nie podales nazwy piosenki`)
        );
      //if the user is not on voice channel then send error
      if (!message.member.voice.channel)
        message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Nie jestes na kanale głosowym`)
        );
      else {
        //if the bot is not on voice channel then join the user's voice channel
        if (!client.voice.connections.get(message.guild.id)) {
          message.member.voice.channel.join().then(connection => {
            //play the song
            const dispatcher = connection.play(args[1]);
            //set the volume
            dispatcher.setVolume(0.5);
            //send the message
            message.channel.send(new MessageEmbed()
              .setColor(ee.rightcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`✅ Piosenka zostala puszczona`)
              .setDescription(`Piosenka: ${args[1]}`)
            );
          });
        }

      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`\`\`${e.stack}\`\`\``)


      );
    }
  }
}

//
