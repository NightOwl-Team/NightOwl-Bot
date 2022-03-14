const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const db = require("quick.db")
const Discord = require("discord.js");
module.exports = {
    name: "set-level",
    category: "Levels",
    aliases: ["ustawlvl, set-lvl"],
    cooldown: 2,
    usage: "set-level [user] [ile lvl]",
    description: "Ustawia exp użytkownika",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //check if user has permission to use this command
            if (!message.member.hasPermission("ADMINISTARTOR")) return message.channel.send(` Nie masz permisji!`);
            //check if user has provided a user
            if (!args[0]) return message.channel.send(` Podaj użytkownika!`);
            //check if user is a valid user
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.channel.send(` Podaj poprawnego użytkownika!`);
            //check if user has a level
            let xp = await db.fetch(`userData.${user.id}.${message.guild.id}.xp`);
            //check if user provided a number of xp
            if (!args[1]) return message.channel.send(` Podaj ilość expa!`);
            //check if the number of xp is a number
            if (isNaN(args[1])) return message.channel.send(` Podaj liczbę!`);
            //check if the number of xp is a number
            if (args[1] < 0) return message.channel.send(` Podaj liczbę dodatnią!`);
            //check if the number of xp is a number
            if (args[1] > 100000) return message.channel.send(` Podaj liczbę mniejszą od 100000!`);
            let level = db.get(`userData.${message.author.id}.${message.guild.id}.level`);
            let nextLevel = Math.floor(5 * Math.pow(level, 2) + 69 * level);
            //add xp to the user
            //check if the xp is higher than the next level


            //ad xp to the user


            db.set(`userData.${user.id}.${message.guild.id}.level`, args[1]);
            //send a message to the channel
            message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.color)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setDescription(`${user} ma teraz ${args[1]} level!`)
                .setTimestamp()
                .setFooter(`${message.guild.name}`, message.guild.iconURL()));



        }
        catch (err) {
            console.log(err)
        }
    }
}
