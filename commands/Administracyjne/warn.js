const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { fs } = require("fs");
const guildwarns = require("../../botconfig/guildwarns.json");
const db = require("quick.db")

module.exports = {
    name: "warn",
    category: "Administracyjne",
    aliases: ["w"],
    cooldown: 2,
    usage: "warn <user> <reason>",
    description: "daje warna userowi",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Nie masz permizji `ADMINISTRATOR`!");
            }

            const user = message.mentions.members.first()

            if (!user) {
                return message.channel.send("wpisz komu chcesz dac warna!");
            }

            if (message.mentions.users.first().bot) {
                return message.channel.send("Nie możesz dawać warna botowi!");
            }

            if (message.author.id === user.id) {
                return message.channel.send("Nie możesz dawać warna samego siebie!");
            }



            const reason = args.slice(1).join(" ")

            if (!reason) {
                return message.channel.send("Musisz dac powód!");
            }

            let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

            if (warnings === 3) {
                return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
            }

            if (warnings === null) {
                db.set(`warnings_${message.guild.id}_${user.id}`, 1)
                user.send(`Zostałes zwarnowany w  **${message.guild.name}** za ${reason}`)
                await message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ WARN | Użytkownik otrzymał ostrzeżenie`)
                    .setDescription(`${message.mentions.users.first().username} został zwarnowany za: ${reason}`)
                    .setFooter(ee.footertext, ee.footericon)
                )
            } else {
                db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                user.send((new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ WARN | Zostałes ostrzeżony`)
                    .setDescription(`Otrzymałes warna za ${reason}`)
                    .setFooter(ee.footertext, ee.footericon)
                ))

                await message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ WARN | Użytkownik otrzymał ostrzeżenie`)
                    .setDescription(`${message.mentions.users.first().username} został zwarnowany za: ${reason}`)
                    .setFooter(ee.footertext, ee.footericon)
                )


            }
        } catch (err) {
            console.log(err)
        }
    }
}
