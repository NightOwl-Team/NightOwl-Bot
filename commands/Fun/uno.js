const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const fetch = require("node-fetch");

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
                                                for (let i = 0; i < 5; i++) {
                                                    //create new deck using api
                                                    let deck = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(res => res.json());
                                                    //get cards from deck
                                                    let cards = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`).then(res => res.json());
                                                    //add cards to player and opponent cards
                                                    playercards.push(cards.cards[0]);
                                                    opponentcards.push(cards.cards[1]);
                                                }
                                                //send cards using a message visible for only one person
                                                message.channel.send(new MessageEmbed()
                                                    .setColor(ee.color)
                                                    .setFooter(ee.footertext, ee.footericon)
                                                    .setTitle(`Karty`)
                                                    .setDescription(`${message.author}`)
                                                    .addField(`Karty gracza`, `${playercards[0].image}`)
                                                    .addField(`Karty przeciwnika`, `${opponentcards[0].image}`)
                                                ).then(async msg => {
                                                    msg.delete({ timeout: 5000 })
                                                    message.channel.send("tyle zrobilem narazie XD")
                                                })


































                                            })

                                        });

                                    }
                                }, 1000);
                            });
                        }
                    });
                    //exit if user clicks on decline
                    collector.on("end", collected => {
                        if (collected.size === 0) {
                            msg.delete();
                            message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`❌ Wyzwanie zostalo odrzucone`)
                            );
                        }
                    });
                });
            }

        }

        catch (err) {
            console.log(err);
        }
    }



}
