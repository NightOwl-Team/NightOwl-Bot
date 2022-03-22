const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "diceroll",
    category: "Fun",
    aliases: ["roll", "dice"],
    cooldown: 2,
    usage: "diceroll",
    description: "Rzuca za ciebie kostką",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create dice roll command
            let dice = Math.floor(Math.random() * 6) + 1;
            //create embed with dice roll gif created using api
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`🎲 Kostka`)
                .setDescription(`Wylosowałeś: ${dice}`)
                .setImage(`http://roll.diceapi.com/d${dice}`)
                .setTimestamp()
            message.channel.send(embed);
        } catch (err) {
            console.log(err)
        }
    }
}

