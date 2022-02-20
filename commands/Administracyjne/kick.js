const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "kick",
    category: "Administracyjne",
    aliases: ["kick"],
    cooldown: 2,
    usage: "kick <user> <reason>",
    description: "kicka usera",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create kick command 
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
            //check if user is in the server
            if (!user.kickable)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie możesz kickać tego usera`)

                );
            //check if user isnt the message author
            if (user.id === message.author.id) {
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie możesz kickać siebie`)
                );
            }





            user.kick(reason);
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ KICK | Uzytkownik zostal wyrzucony`)
                .setDescription(`Uzytkownik: ${user}`)
                .addField(`Powód:`, reason)
            )



        } catch (e) {
            console.log(String(e.stack).bgRed);
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Coś poszło nie tak`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}





