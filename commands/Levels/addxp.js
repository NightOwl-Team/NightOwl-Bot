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
        try { }
        catch (err) {
            console.log(err)
        }
    }
}
