const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "unmute",
    category: "Administracyjne",
    aliases: ["um", "umute", "unm"],
    cooldown: 2,
    usage: "unmute <user>",
    description: "unmutuje usera",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create unmute command
            if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new MessageEmbed()
                .addField(`❌ ERROR | Nie masz permisji`, `${message.author}`)
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
                    .setTitle(`❌ ERROR | Nie możesz unmuteać tego usera`)
                );
            let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
            //remove role

            await (user.roles.remove(muterole.id));

            message.channel.send(new MessageEmbed()
                .setColor(ee.rightcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ Użytkownik został odmutowany`)
                .setDescription(`${user} został odmutowany przez ${message.author} za ${reason}`)
            );
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}

