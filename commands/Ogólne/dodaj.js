const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
db = require("quick.db");
module.exports = {
    name: "dodaj",
    category: "Ogólne",
    aliases: ["add", "join"],
    cooldown: 2,
    usage: "dodaj",
    description: "Wysyła link do dodania bota",
    run: async (client, message, args, user, text, prefix) => {
        try {
            const embed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`Dodaj bota na swój serwer!`)
                .setDescription(`[Kliknij tutaj](https://discordapp.com/api/oauth2/authorize?client_id=723180989841009408&permissions=8&scope=bot)`)
                .setFooter(ee.footertext, ee.footericon)
            message.channel.send(embed)
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }

}

