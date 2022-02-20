const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "wolaj",
    category: "Administration",
    aliases: ["wol"],
    cooldown: 2,
    usage: "wolaj <user>",
    description: "wola usera na obiad",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie masz permisji`)

            );
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales usera `)

                );
            let userargs = args.join(" ").split(" ");
            let user = message.mentions.members.first();
            let reason = userargs.slice(1).join(" ")
            if (!user)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales usera`)

                );
            if (!reason)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales powodu`)
                );

            userredy = "<@" + user.id + ">";
            //ping the user 100 times
            for (let i = 0; i < 20; i++) {
                user.send(`${userredy} zostal zawolany na obiad`);
                message.channel.send(`${userredy} zostal zawolany na obiad`);
            }
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ ZAWOLANO | Uzytkownik zostal zawolany na obiad`)
                .setDescription(`Uzytkownik: ${user}`)
                .addField(`Powód:`, reason)
            );

        }
        catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}

