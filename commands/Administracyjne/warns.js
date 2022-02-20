const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
db = require("quick.db");
module.exports = {
    name: "warns",
    category: "Administracyjne",
    aliases: ["warnings", "warny", "iloscwarnow", "warns-ilosc", "warns-ilosc", "warn-ilosc", "warn-ilosc"],
    cooldown: 2,
    usage: "warns <uzytkownik>",
    description: "wysyla ilosc warnow",
    run: async (client, message, args, user, text, prefix) => {
        try {


            //get the user from the message
            const user = message.mentions.members.first()
            //get his nickname
            //if no user is mentioned, get the author
            if (!user) {

                const user = message.author
                let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
                if (warnings === null) {
                    warnings = 0
                }

                //also get the user's nickname
                const nickname = user.id
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ WARNY | Ilosc Warnow`)
                    .setDescription(`<@${nickname}> posiada ${warnings} warnów`)
                    .setFooter(ee.footertext, ee.footericon)
                )

            }
            else {
                const nickname = user.id



                let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)


                if (warnings === null) warnings = 0;

                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ WARNY | Ilosc Warnow`)
                    .setDescription(`<@${nickname}> posiada ${warnings} warnów`)
                    .setFooter(ee.footertext, ee.footericon)
                )
            }


        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle("❌ ERROR | Coś poszło nie tak")
                .setDescription(`${e.message}`)
            )
        }
    }
}

