const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "say",
  category: "Administration",
  aliases: [""],
  cooldown: 2,
  usage: "say <TEXT>",
  description: "Resends your Text",
  run: async (client, message, args, user, text, prefix) => {
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Nie dales textu`)
          .setDescription(`Usage: \`${prefix}${this.usage}\``)
        );
      message.channel.send(text);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | Wystapil blad sora :C`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}
