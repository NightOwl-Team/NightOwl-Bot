const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const canvas = require("canvas");
module.exports = {
    name: "tictactoe",
    category: "Fun",
    aliases: ["tictac", "kolkoikrzyzyk"],
    cooldown: 2,
    usage: "tictactoe @user",
    description: "Rozpoczyna gre w kółko i krzyk",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create tic tac toe command
            //check if user is in the vc
            if (!message.member.voice.channel) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie jestes na kanale głosowym`)
            );
            //check if user mentioned someone
            if (!args[0]) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie podales usera`)
            );
            //check if the user is a bot
            if (args[0].bot) return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie mozesz zagrac z botem`)
            );
            let user = //get the user from the mention
                message.mentions.users.first();

            //join voice channel of user
            message.member.voice.channel.join();
            //create embed with tic tac toe gif created using api
            let embed = new MessageEmbed()

                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`🎮 TIC TAC TOE 🎮`)
                .setDescription(`${message.author} rozpoczyna gre w kółko i krzyk`)
                .addField(`Czy pzyjmujesz wyzwanie? ${user}`)


            message.channel.send(embed).then(async msg => {
                message.react("✔");
                message.react("❌");
                //create reaction collector
                const filter = (reaction, user) => {
                    return ['✔', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                }
                const collector = msg.createReactionCollector(filter, { time: 60000 });
                collector.on('collect', async (reaction, user) => {
                    //check if the reaction is correct
                    if (reaction.emoji.name === '✔') {
                        //stwoz stół do gry uzywajac canvas
                        let canvas = canvas.createCanvas(700, 500);
                        let ctx = canvas.getContext('2d');
                        //stwórz tło
                        ctx.fillStyle = '#000000';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        //stwórz linie
                        ctx.strokeStyle = '#ffffff';
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(0, 200);
                        ctx.lineTo(700, 200);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(350, 0);
                        ctx.lineTo(350, 500);
                        ctx.closePath();
                        ctx.stroke();
                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`🎮 TIC TAC TOE 🎮`)
                            .setDescription(`Wyzwanie przyjete`)
                            .addField(`Zaczynamy`)

                        //send embed
                        msg.edit(embed);
                        //create reaction collector
                        const filter = (reaction, user) => {
                            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
                        }
                        const collector = msg.createReactionCollector(filter, { time: 60000 });
                        collector.on('collect', async (reaction, user) => {
                            //check if the reaction is correct
                            if (reaction.emoji.name === '1️⃣') {
                                //narysuj w polu nr 1 na canvasie
                                ctx.beginPath();
                                ctx.arc(50, 50, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '2️⃣') {
                                //narysuj w polu nr 2 na canvasie
                                ctx.beginPath();
                                ctx.arc(150, 50, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '3️⃣') {
                                //narysuj w polu nr 3 na canvasie
                                ctx.beginPath();
                                ctx.arc(250, 50, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '4️⃣') {
                                //narysuj w polu nr 4 na canvasie
                                ctx.beginPath();
                                ctx.arc(50, 150, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '5️⃣') {
                                //narysuj w polu nr 5 na canvasie
                                ctx.beginPath();
                                ctx.arc(150, 150, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '6️⃣') {
                                //narysuj w polu nr 6 na canvasie
                                ctx.beginPath();
                                ctx.arc(250, 150, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }

                            if (reaction.emoji.name === '7️⃣') {
                                //narysuj w polu nr 7 na canvasie
                                ctx.beginPath();
                                ctx.arc(50, 250, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '8️⃣') {
                                //narysuj w polu nr 8 na canvasie
                                ctx.beginPath();
                                ctx.arc(150, 250, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                            }
                            if (reaction.emoji.name === '9️⃣') {
                                //narysuj w polu nr 9 na canvasie
                                ctx.beginPath();
                                ctx.arc(250, 250, 40, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = '#ffffff';
                                ctx.fill();
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 5;
                                ctx.stroke();
                                //send embed
                                msg.edit(new MessageEmbed()
                                    .setColor(ee.color)
                                    .setFooter(ee.footertext, ee.footericon)
                                    .setTitle(`🎮 TIC TAC TOE 🎮`)
                                    .setImage(canvas.toBuffer())
                                );
                                //delate reaction
                                reaction.users.remove(user);
                                //delate the bot reaction
                                msg.reactions.remove(reaction.emoji.name);
                                //close all ifs and add catch
                            }
                        });

                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
}





