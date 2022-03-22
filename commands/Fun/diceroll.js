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
                .setThumbnail(`http://roll.diceapi.com/images/poorly-drawn/d6/${dice}.png`)
                .setTimestamp()


            //send info about rolling and after 2 sec edit the embed with the result
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`🎲 Kostka`)
                .setDescription(`Losuje...`)
                .setTimestamp()
                .setImage(`https://th.bing.com/th/id/R.c8189a0f2f9f0e4b91ad323d31e0a6c1?rik=Nx5Sq0Ym8SpNAA&pid=ImgRaw&r=0`)
            )
                .then(msg => {
                    //wait 2 sec
                    setTimeout(function () {
                        //edit embed with result

                        msg.edit(embed)
                    }, 2000)
                }
                )
        } catch (err) {
            console.log(err)
        }
    }
}

