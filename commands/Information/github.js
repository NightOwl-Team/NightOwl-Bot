const axios = require('axios')
const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const RedditImageFetcher = require("reddit-image-fetcher");
const fs = require('fs')
module.exports = {
    name: "github",
    category: "Information",
    aliases: ["git"],
    cooldown: 2,
    usage: "git <username> ",
    description: "Wysyła informacje o githubie podanego użytkownika",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (context.params.event.content.startsWith("!github")) {
                const search = context.params.event.content.split(" ").slice(1)
                if (!search[0]) return lib.discord.channels['@0.1.1'].messages.create({
                    channel_id: context.params.event.channel_id,
                    content: `Wpisz nazwe uzytkownika.`
                });

                let data = await axios(` https://api.github.com/users/${search[0]}`, {
                    headers: {
                        accept: "application/vnd.github.v3+json"
                    }
                }).catch(err => { })

                if (!data) return lib.discord.channels['@0.1.1'].messages.create({
                    channel_id: context.params.event.channel_id,
                    content: `Nie ma takiego użytkownika!`
                })
                else data = data.data

                await lib.discord.channels['@0.1.1'].messages.create({
                    channel_id: context.params.event.channel_id,
                    content: ``,
                    embed: {
                        title: data.name,
                        url: `https://github.com/${data.login}`,
                        description: data.bio,
                        thumbnail: { url: data.avatar_url },
                        color: 0x161b22,
                        fields: [
                            { name: "Obserwujacy: ", value: data.followers, inline: true },
                            { name: "Publiczne Reprozytoria: ", value: data.public_repos, inline: true },
                            { name: "Konto utworzono: ", value: `${new Date(data.created_at)}` }
                        ]
                    }
                });

            }
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}