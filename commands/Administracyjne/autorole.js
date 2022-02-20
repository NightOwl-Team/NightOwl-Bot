const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { ReactionRoleManager } = require('discord.js-collector'); //We import the discord.js-collector package that'll make reaction roles possible
const { Client } = require('discord.js'); // We import the client con
module.exports = {
    name: "reactionrole",
    category: "Administracyjne",
    aliases: ["rr"],
    cooldown: 2,
    usage: "reactionrole <role> <emoji> <message>",
    description: "add an reaction and when somone reacts it gives him role",
    run: async (client, message, args, user, text, prefix) => {
        try {
            const client = message.client;
            const reactionRoleManager = new ReactionRoleManager(client, {
                //We create a reaction role manager that'll handle everything related to reaction roles
                storage: true, // Enable reaction role store in a Json file
                path: __dirname + '/roles.json', // Where will save the roles if store is enabled
                mongoDbLink: 'mongodb+srv://nightowlbot:kZmjWNNClhzPk7tT@nightowlbot.m7erg.mongodb.net/nightowlbot?retryWrites=true&w=majority', // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/tree/dev/examples/reaction-role-manager/Note.md & https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514
            });


            const args = message.content.split(' ').slice(1);

            const role = message.mentions.roles.first();
            if (!role)
                return message
                    .reply('Musisz wskazać rolę!')
                    .then((m) => m.delete({ timeout: 1_000 }));

            const emoji = args[1];
            if (!emoji)
                return message
                    .reply('Musisz wskazać emoji!')
                    .then((m) => m.delete({ timeout: 1_000 }));

            const msg = await message.channel.messages.fetch(args[2] || message.id);
            if (!role)
                return message
                    .reply('Wiadomosc nie znaleziona!')
                    .then((m) => m.delete({ timeout: 1_000 }));

            reactionRoleManager.addRole({
                message: msg,
                role,
                emoji,
            });
            message.reply('Done').then((m) => m.delete({ timeout: 500 }));








        } catch (e) {
            console.log(e.stack);

        }
    }
}



