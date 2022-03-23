const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const RedditImageFetcher = require("reddit-image-fetcher");
const fs = require('fs')
module.exports = {
    name: "cat",
    category: "Fun",
    aliases: ["kot"],
    cooldown: 2,
    usage: "cat ",
    description: "Wysyła mema ze słodkim kotkiem",
    run: async (client, message, args, user, text, prefix) => {
        try {

            const url = 'https://www.reddit.com/r/cat/hot/.json?limit=100'
            //create embed with the cat image
            const embed = new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
                .setTitle(`Funny cat meme`)
                .setImage(url)
                .setURL(url)
                .setDescription(`[Click here to view the full post](${url})`)
        } catch (err) {
            console.log(err)
        }
    }
}

