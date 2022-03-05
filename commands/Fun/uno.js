const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const yellowcards = require("../../botconfig/cards/yellow");
const redcards = require("../../botconfig/cards/red");
const greencards = require("../../botconfig/cards/green");
const bluecards = require("../../botconfig/cards/blue");
const wildcards = require("../../botconfig/cards/wild");


module.exports = {
    name: "uno",
    category: "Fun",
    aliases: ["playuno"],
    cooldown: 2,
    usage: "uno <tryb> <gracz>",
    description: "Rozpoczyna duel z graczem",
    run: async (client, message, args, user, text, prefix) => {
        try {
            if (!args[0]) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie podales trybu`)
                .setDescription(`Tryby:  \n\n**duel** zadaje wyzwanie do gry\n\n`)
            );
            if (!args[1]) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie podales gracza`)
                .setDescription(`Tryby:  \n\n**duel** zadaje wyzwanie do gry \n\n**accept** akceptuje wyzwanie \n\n**decline** odrzuca wyzwanie`)
            );


            if (user.id === client.user.id) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie mozesz grać ze mną jeszce (comming soon)`)
            );
            //check if user is in the same guild
            if (user.guild.id !== message.guild.id) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Ten gracz nie jest na tym serwerze`)
            );
            //ask user if he wants to challenge
            if (args[0] === "duel") {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❓ Czy chesz zakceptowac wyzwanie?`)
                    .setDescription(`${user}`)
                    .addField(`${message.author} zadaje wyzwanie do gry`)
                ).then(async msg => {
                    await msg.react("✅");
                    await msg.react("❌");
                    const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id === user.id;
                    const collector = msg.createReactionCollector(filter, { time: 60000 });
                    collector.on("collect", async r => {
                        if (r.emoji.name === "✅") {
                            let i = 80;
                            msg.delete();
                            message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                .setDescription(`Trwa przygotowywanie gry ${i}%`)
                            ).then(async msg => {

                                //edit message every second adding a percentege

                                let interval = setInterval(async () => {
                                    i++;
                                    //edit message every second adding a percentege
                                    msg.edit(new MessageEmbed()
                                        .setColor(ee.color)
                                        .setFooter(ee.footertext, ee.footericon)
                                        .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                        .setDescription(`Trwa przygotowywanie gry ${i}%`)
                                    );
                                    if (i === 100) {
                                        clearInterval(interval);
                                        msg.delete();
                                        message.channel.send(new MessageEmbed()
                                            .setColor(ee.color)
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                            .setDescription(`Gra zostala przygotowana - Zaczynamy!`)
                                        ).then(async msg => {
                                            msg.delete({ timeout: 5000 })
                                            //start game
                                            message.channel.send(new MessageEmbed()
                                                .setColor(ee.color)
                                                .setFooter(ee.footertext, ee.footericon)
                                                .setTitle(`Rozdaje karty`)
                                                .setDescription(`Chwileczkę...`)
                                            ).then(async msg => {
                                                msg.delete({ timeout: 5000 })
                                                //get cards for player and his opponent
                                                let playercards = [];
                                                let opponentcards = [];
                                                for (let i = 0; i < 7; i++) {
                                                    //generate 7 random cards with colors
                                                    let random = Math.floor(Math.random() * 4);
                                                    if (random === 0) {
                                                        playercards.push(yellowcards[Math.floor(Math.random() * yellowcards.length)]);
                                                        opponentcards.push(redcards[Math.floor(Math.random() * redcards.length)]);
                                                    } else if (random === 1) {
                                                        playercards.push(bluecards[Math.floor(Math.random() * bluecards.length)]);
                                                        opponentcards.push(greencards[Math.floor(Math.random() * greencards.length)]);
                                                    } else if (random === 2) {
                                                        playercards.push(redcards[Math.floor(Math.random() * redcards.length)]);
                                                        opponentcards.push(yellowcards[Math.floor(Math.random() * yellowcards.length)]);
                                                    } else if (random === 3) {
                                                        playercards.push(greencards[Math.floor(Math.random() * greencards.length)]);
                                                        opponentcards.push(bluecards[Math.floor(Math.random() * bluecards.length)]);
                                                    } else if (random === 4) {
                                                        playercards.push(yellowcards[Math.floor(Math.random() * yellowcards.length)]);
                                                        opponentcards.push(redcards[Math.floor(Math.random() * redcards.length)]);
                                                    } else if (random === 5) {
                                                        playercards.push(bluecards[Math.floor(Math.random() * bluecards.length)]);
                                                        opponentcards.push(greencards[Math.floor(Math.random() * greencards.length)]);
                                                    } else if (random === 6) {
                                                        playercards.push(wildcards[Math.floor(Math.random() * wildcards.length)]);
                                                        opponentcards.push(bluecards[Math.floor(Math.random() * bluecards.length)]);
                                                    } else if (random === 7) {
                                                        playercards.push(wildcards[Math.floor(Math.random() * wildcards.length)]);
                                                        opponentcards.push(greencards[Math.floor(Math.random() * redcards.length)]);
                                                        //

                                                    }
                                                    //send cards using a message visible for only one person
                                                    message.channel.send(new MessageEmbed()
                                                        .setColor(ee.color)
                                                        .setFooter(ee.footertext, ee.footericon)
                                                        .setTitle(`Twoje karty`)
                                                        .setDescription(`${playercards.join("\n")}`)
                                                    ).then(async msg => {
                                                        msg.delete({ timeout: 5000 })
                                                        message.channel.send(new MessageEmbed()
                                                            .setColor(ee.color)
                                                            .setFooter(ee.footertext, ee.footericon)
                                                            .setTitle(`Karty przeciwnika`)
                                                            .setDescription(`${opponentcards.join("\n")}`)

                                                        ).then(async msg => {
                                                            msg.delete({ timeout: 5000 })
                                                            message.channel.send("to wsyzstko XDDD")
                                                        })
                                                    })
                                                }
                                            })
                                        })
                                    }
                                }, 1000);
                            })
                        }
                    })
                })
            }

        } catch (err) {
            console.log(err);

        }
    }





}
