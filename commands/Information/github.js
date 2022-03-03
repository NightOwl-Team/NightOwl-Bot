const axios = require('axios')
const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const RedditImageFetcher = require("reddit-image-fetcher");
const fs = require('fs')
const axios = require('axios')
module.exports = {
    name: "github",
    category: "Information",
    aliases: ["git"],
    cooldown: 2,
    usage: "git <username> ",
    description: "Wysyła informacje o githubie podanego użytkownika",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (!args[0]) return message.channel.send("Podaj nazwę użytkownika!")
            let user = args[0]
            let url = `https://api.github.com/users/${user}`
            let { data } = await axios.get(url)
            let { avatar_url, name, bio, company, location, blog, public_repos, followers, following, created_at } = data
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`Informacje o ${name}`)

                .setThumbnail(avatar_url)
                .addField("Nazwa", name, true)
                .addField("O nim:", bio, true)
                .addField("Firma", company, true)
                .addField("Lokalizacja", location, true)
                .addField("Blog", blog, true)
                .addField("Repozytoria", public_repos, true)
                .addField("Obserwujacy", followers, true)
                .addField("Obserwuje", following, true)
                .addField("Data utworzenia", created_at, true)
                .setFooter(`Night Owl ©️ ${new Date().getFullYear()}`)
                .setTimestamp()
            message.channel.send(embed)

        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}