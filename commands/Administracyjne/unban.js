const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "unban",
    category: "Administracyjne",
    aliases: ["uban"],
    cooldown: 2,
    usage: "unban <uzytkownik> <powód>",
    description: "Odbanowwywuje typka",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create unban command
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
            let user = await client.users.fetch(args.slice(0).join(" "));






            //unban user
            message.guild.members.unban(user);
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ UNBAN | Uzytkownik zostal Odbanowany`)
                .setDescription(`Uzytkownik: ${user}`)
                .addField(`Administrator:`, message.author)
            )
        } catch (err) {
            console.log(err)
        }
    }
}

