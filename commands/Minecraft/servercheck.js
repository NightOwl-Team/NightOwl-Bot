const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
db = require("quick.db");
const status = require("minecraft-server-status");
mineflayer = require("mineflayer");
module.exports = {
    name: "servercheck",
    category: "Minecraft",
    aliases: ["serverping", "status"],
    cooldown: 2,
    usage: "servercheck <ipserwera>",
    description: "Checks if the server is online",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //get the server  ip from the message
            const ip = args[0]
            //check if the ip is valid
            if (!ip) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`❌ SERVERCHECK | ERROR`)
                    .setDescription(`Podaj ip serwera`)
                    .setFooter(ee.footertext, ee.footericon)
                )
            }

            //create a mineflayer client for any relase of minecraft
            const bot = mineflayer.createBot({
                host: ip, // minecraft server ip
                username: 'NightOwl Bot', // minecraft username
                // minecraft password, comment out if you want to log into online-mode=false servers
                // port: 25565,                // only set if you need a port that isn't 25565
                version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
                // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
            })
            //connect the bot to the server
            bot.on("login", () => {
                //check if the bot is online
                if (bot.isOnline()) {
                    //send a message to the channel
                    message.channel.send("Sprawdzam...")
                }

                //save the online players count to a variable
                const online = bot.players.length
                //save the max players count to a variable
                const max = bot.maxPlayers
                //save the server name to a variable
                const name = bot.serverName
                //save the server version to a variable
                const version = bot.version
                //save the server motd to a variable
                const motd = bot.motd
                //save the server icon to a variable
                const icon = bot.favicon
                //save the server icon to a variable
                const iconurl = bot.faviconURL
                //save the server icon to a variable

                status(ip, 25565, response => {
                    console.log(response)
                    //if 
                    if (response.online) {
                        //send a message to the channel
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setThumbnail(iconurl)
                            .setTitle(`✅ SERVERCHECK | ${name}`)
                            .setDescription(`**Status:** **Online**\n**IP:** ${ip}\n**Online:** ${online}/${max}\n**Version:** ${version}\n**MOTD:** ${motd}`)
                            .setFooter(ee.footertext, ee.footericon)
                        )
                    } else {
                        //send a message to the channel
                        message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setThumbnail(iconurl)
                            .setTitle(`❌ SERVERCHECK | ${name}`)
                            .setDescription(`**Status:** **Offline**\n**IP:** ${ip}\n{max}\n**Version:** ${version}\n**MOTD:** ${motd}`)
                            .setFooter(ee.footertext, ee.footericon)
                        )
                    }
                })

            })


            bot.once('spawn', () => {
                mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`✅ SERVERCHECK | STATUS`)
                    .setDescription(`Serwer jest online`)
                    .setFooter(ee.footertext, ee.footericon)
                    .addField(`Dodadkowe informacje:`)
                    .addField(`Nazwa serwera:`, name)
                    .addField(`Wersja serwera:`, version)
                    .addField(`MOTD:`, motd)
                    .addField(`Online:`, online)
                    .addField(`Max:`, max)
                    .setImage(iconurl)
                    .setTimestamp()
                )
            })

        }
        catch (err) { console.log(err) }
    }
}






