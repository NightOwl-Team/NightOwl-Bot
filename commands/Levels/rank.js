const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const db = require("quick.db")
const Discord = require("discord.js");
module.exports = {
    name: "rank",
    category: "Levels",
    aliases: ["myrank, xp"],
    cooldown: 2,
    usage: "rank [user]",
    description: "Pokazuje ile masz expa / dany uzytkownik",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (!args[0]) {
                //if user dosent have a values in database
                if (!db.has(`userData.${message.author.id}.${message.guild.id}.xp`)) {
                    message.channel.send("nie masz expa lmfaoooo")
                    //set the xp to 0
                    db.set(`userData.${message.author.id}.${message.guild.id}.xp`, 0);
                    //set the level to 1
                    db.set(`userData.${message.author.id}.${message.guild.id}.level`, 1);
                }

                //fetch the message authors xp
                xp = db.fetch(`userData.${message.author.id}.${message.guild.id}.xp`)
                //if the xp is not there, set it to 0

                //fetch the message authors level
                level = await db.fetch(`userData.${message.author.id}.${message.guild.id}.level`)

                //if the level is not the
                //fetch the message authors xp needed to level up

                let nextLevel = Math.floor(5 * Math.pow(level, 2) + 69 * level);

                //send the message
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📈 | ${message.author.username}`)
                    .setDescription(`**Level:** ${level}\n**XP:** ${xp}/${nextLevel}`)
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }))
                )
            } else {
                //check if we have user mentioned
                let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args.join(" ").toLowerCase());
                //check if the arg is a user

                if (!user) return message.channel.send("Nie znaleziono użytkownika!")
                //check if the user is a bot
                if (user.bot) return message.channel.send("Boty nie posiadaja swietnego sytemu expa :C ||dyskryminacja||")
                //if user dosent have a values in database
                if (!db.has(`userData.${user.id}.${message.guild.id}.xp`)) return message.channel.send("Uztkownik nie ma jeszcze expa!")


                //set the xp to 0
                //fetch the mentioned users xp
                xp = db.fetch(`userData.${user.id}.${message.guild.id}.xp`)
                //if the xp is not there, set it to 0
                if (!xp) xp = 0;
                //fetch the mentioned users level
                level = await db.fetch(`userData.${user.id}.${message.guild.id}.level`)
                //if the level is not the
                //fetch the mentioned users xp needed to level up
                nextLevel = Math.floor(5 * Math.pow(level, 2) + 69 * level);
                //send the message
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📈 | ${user.username}`)
                    .setDescription(`**Level:** ${level}\n**XP:** ${xp}/${nextLevel}`)
                    .setTimestamp()
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }))
                )

            }


        } catch (e) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`❌ ERROR | Wystapil blad`)
                    .setDescription(`\`\`\`${e.stack}\`\`\``)

            )
        }
    }
}



