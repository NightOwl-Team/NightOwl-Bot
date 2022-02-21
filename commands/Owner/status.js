const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const RedditImageFetcher = require("reddit-image-fetcher");
const fs = require('fs')
module.exports = {
    name: "status",
    category: "Owner",
    aliases: ["botstatus"],
    cooldown: 2,
    usage: "TAJNE PRZEZ POUFNE LMAO ",
    description: "Set the bot status",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //check if the user is the owner
            if (message.author.id !== config.ownerID) return message.channel.send("Nie jesteś właścicielem bota! WYPIERDALAJ! WYPIERDALAJ! WYPIERDALAJ! WYPIERDALAJ! WYPIERDALAJ! ");
            //check if owner provided arguments
            if (!args[0]) return message.channel.send("Podaj status bota!");
            //check if owner provided valid arguments
            if (args[0] !== "online" && args[0] !== "idle" && args[0] !== "dnd" && args[0] !== "invisible") return message.channel.send("Podaj prawidłowy status bota!");
            //set the status
            client.user.setStatus(args[0]);
            //send a message to the owner
            message.channel.send("Status został ustawiony!");
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}


