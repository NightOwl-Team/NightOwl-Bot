const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "8ball",
    category: "Fun",
    aliases: ["ball"],
    cooldown: 2,
    usage: "8ball <pytanie>",
    description: "Odpowiada na pytanie typu tak/nie",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //tell user about the 8ball loading
            //check if user wrote a question
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales pytania`)
                );
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`🎱 Ładuję 8balla...`)
            );
            //create 8ball command
            let answers = [
                "Tak",
                "Nie",
                "Nie wiem",

            ];
            let result = answers[Math.floor(Math.random() * answers.length)];


            setTimeout(function () {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Kula mówi:`)
                    .setDescription(`${result}`)
                    .addField(`Pytanie:`, `${args.join(" ")}`)
                );
            }
                , 5000);
        } catch (err) {
            console.log(err);
        }
    }
}


