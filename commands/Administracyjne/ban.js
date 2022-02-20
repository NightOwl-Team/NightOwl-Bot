const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ban",
    category: "Administracyjne",
    aliases: ["monka-ban"],
    cooldown: 2,
    usage: "ban <uzytkownik> ++ <powód>",
    description: "Wysyła embeda",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create ban command
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie masz permisji`)

            );
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales usera`)

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
                    .setTitle(`❌ ERROR | Nie możesz banować tego usera`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                );
            user.kick(reason);
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ BAN | Uzytkownik zostal Zbanowany`)
                .setDescription(`Uzytkownik: ${user}`)
                .addField(`Powód:`, reason)
            )



        } catch (e) {
            console.log(String(e.stack).bgRed);
        }




    }
}
