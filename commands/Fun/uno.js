const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
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
                .setDescription(`Tryby:  \n\n**challenge** zadaje wyzwanie do gry\n\n`)
            );
            if (!args[1]) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie podales gracza`)
                .setDescription(`Tryby:  \n\n**challenge** zadaje wyzwanie do gry \n\n**accept** akceptuje wyzwanie \n\n**decline** odrzuca wyzwanie`)
            );
            if (args[0] === "challenge") {
                let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
                if (!user) return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie znaleziono gracza`)
                    .setDescription(`Tryby:  \n\n**challenge** zadaje wyzwanie do gry \n\n**accept** akceptuje wyzwanie \n\n**decline** odrzuca wyzwanie`)
                );
                if (user.id === message.author.id) return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie mozesz grać ze samym sobą`)
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
                if (args[0] === "challenge") {
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
                        const collector = msg.createReactionCollector(filter, { time: 6000 });
                        collector.on("collect", async r => {
                            if (r.emoji.name === "✅") {
                                let i = 0;
                                msg.delete();
                                message.channel.send(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                    .setDescription(`Trwa przygotowywanie gry {$i}`)
                                ).then(async msg => {

                                    //edit message every second adding a percentege

                                    let interval = setInterval(async () => {
                                        i++;
                                        //edit message every second adding a percentege
                                        msg.edit(new MessageEmbed()
                                            .setColor(ee.color)
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                            .setDescription(`Trwa przygotowywanie gry {$i}`)
                                        );
                                        if (i === 100) {
                                            clearInterval(interval);
                                            msg.delete();
                                            message.channel.send(new MessageEmbed()
                                                .setColor(ee.color)
                                                .setFooter(ee.footertext, ee.footericon)
                                                .setTitle(`✅ Wyzwanie zostalo zaakceptowane`)
                                                .setDescription(`Gra zostala przygotowana- Zaczynamy!`)
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
        }

        catch (err) {
            console.log(err);
        }
    }



}
