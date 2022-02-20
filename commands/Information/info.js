const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "info",
    category: "Information",
    aliases: ["i"],
    cooldown: 2,
    usage: "info",
    description: "Wyswietla informacje o bocie",
    run: async (client, message, args, user, text, prefix) => {

        try {
            //send info about the bot
            const embed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`Informacje o bocie`)
                .setDescription(`**Nazwa:** ${client.user.username}`)
                .addField(`**Wersja:**`, `${config.version}`)
                .addField(`**Serwery:**`, `${client.guilds.cache.size}`)
                .addField(`**Ping:**`, `${client.ws.ping}ms`)
                .addField(`**Database Ping**`, `3ms`)
                .addField(`**Autorzy**`, `${config.author}`)
                .setFooter(ee.footertext, ee.footericon)
            message.channel.send(embed)
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}


