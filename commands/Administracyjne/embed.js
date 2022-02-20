const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions")
module.exports = {
  name: "embed",
  category: "Administracyjne",
  aliases: ["embd"],
  cooldown: 2,
  usage: "embed <TYTUŁ> ++ <OPIS>",
  description: "Wysyła embeda",
  run: async (client, message, args, user, text, prefix) => {
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Nie podales tytulu lub opisu`)
        );

      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")

      //it dont work when the message is higher than 2048 characters
      // message.channel.send(new MessageEmbed()
      //   .setColor(ee.color)
      //   .setFooter(ee.footertext, ee.footericon)
      //   .setTitle(title)
      //   .setDescription(desc)
      //   .setAuthor("NightOwl Bot", client.user.displayAvatarURL())
      //   .addField("Wywołane  przez:", `${message.author.tag}`)
      //   .setTimestamp()
      // );

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(title ? title : "")

        .setDescription(desc ? desc : "")
        //.setAuthor("NightOwl Bot", client.user.displayAvatarURL())
        .setTimestamp()
      );







    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | Coś poszło nie tak`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}

