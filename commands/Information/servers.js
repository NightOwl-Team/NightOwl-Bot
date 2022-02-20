const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "servers",
    category: "Information",
    aliases: ["serwery", "srv"],
    cooldown: 2,
    usage: "serwery",
    description: "Mówi ile bot ma serwerów",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //send message with embed to the channel
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`📡 Serwery`)
                .setDescription(`Bot jest na ${client.guilds.cache.size} serwerach`)
            );
        } catch (e) {
        }
    }
}