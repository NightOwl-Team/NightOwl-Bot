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
            if (!args[0])
                //fetch the message authors xp
                xp = await db.fetch(`userData.${message.author.id}.${message.guild.id}.xp`)
            //if the xp is not there, set it to 0
            if (!xp) xp = 0;
            //fetch the message authors level
            level = await db.fetch(`userData.${message.author.id}.${message.guild.id}.level`)
            //if the level is not there, set it to 0
            if (!level) level = 0;
            //fetch the message authors xp needed to level up

            let nextLevel = Math.floor(5 * Math.pow(level, 2) + 50 * level);
            //fetch the message authors xp needed to level up
            //send the message
            message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`📈 | ${message.author.username}`)
                .setDescription(`**Level:** ${level}\n**XP:** ${xp}/${nextLevel}`)
            ).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log("Couldn't Delete --> Ignore".gray)));
        } catch (e) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`❌ ERROR | Wystapil blad`)
                    .setDescription(`\`\`\`${e.stack}\`\`\``)

            );

        }

    }
}


