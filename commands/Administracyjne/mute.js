const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "mute",
    category: "Administracyjne",
    aliases: ["m"],
    cooldown: 2,
    usage: "mute <user> <reason>",
    description: "muteuje usera",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create mute command
            if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new MessageEmbed()
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
                    .setTitle(`❌ ERROR | Nie możesz mutowac tego usera`)
                );
            let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
            if (!muterole) {
                //create role
                try {
                    //create role
                    muterole = await message.guild.roles.create({
                        //create role
                        data: {
                            name: "Muted",
                            color: "#000000",
                            permissions: []
                        }
                    });
                    //add role to user
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.updateOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    }
                    );
                } catch (e) {
                    console.log(String(e.stack).bgRed);
                }
            }
            //add role to user
            await (user.roles.add(muterole.id));
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.rightcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ Użytkownik został mutowany`)
                .setDescription(`${user} został mutowany przez ${message.author} za ${reason}`)
            );
            //send message to user
            user.send(new MessageEmbed()
                .setColor(ee.rightcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ Zostałeś mutowany`)
                .setDescription(`Zostałeś mutowany przez ${message.author} za ${reason}`)
            );
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}
