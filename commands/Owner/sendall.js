const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "fucj",
    category: "Admin",
    aliases: ["e"],
    cooldown: 2,
    usage: "eval <comm> <arg>",
    description: "EVAL COMMAND ONLY FOR DEV",
    run: async (client, message, args, user, text, prefix) => {

        //get the arg from user
        let arg = args.join(" ");
        //check if the arg is empty
        if (!arg) return message.channel.send(`${message.author}, podaj treść wiadomości!`);
        //send the message to all servers
        client.guilds.cache.forEach(guild => {
            guild.channels.cache.forEach(channel => {
                if (channel.type === "text") {
                    channel.send(arg);
                }
            });
        });
    }
}