const { MessageEmbed, GuildTemplate } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "count",
    category: "Fun",
    aliases: ["licz"],
    cooldown: 2,
    usage: "liczy razem z tobą! ",
    description: "Liczy razem z tobą!",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //create a command who will couunt with the user
            //set info about counting start
            let count = 0;
            let msg = await message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`📝 COUNTING STARTED | Rozpoczęto liczenie`)
                .setDescription(`Liczę razem z tobą!`)

            );
            //create a message collector to collect messages from the user with numbers and reply higher than the message with the number
            let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 60000 });
            collector.on("collect", m => {
                if (isNaN(m.content)) {
                    m.delete();
                } else {
                    count = parseInt(m.content);
                    msg.edit(new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`📝 COUNTING STARTED | Rozpoczęto liczenie`)
                        .setDescription(`Zaczynamy zabawe!`)
                        .addField(`Wynik:`, count)
                    );

                    //if the user message is same as the message with the number
                    if (m.content === count) {
                        collector.stop();
                        msg.edit(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`📝 COUNTING FALIED | Zakończono liczenie`)
                            .setDescription(`Przegrałes! Podałes za dużą liczbę!`)
                            .addField(`Wynik:`, count)
                        );
                        //if the user message is lower than the message with the number
                    } else if (m.content < count) {
                        collector.stop();
                        msg.edit(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`📝 COUNTING FALIED | Zakończono liczenie`)
                            .setDescription(`Przegrałes! Podałes za małą liczbę!`)
                            .addField(`Wynik:`, count)
                        );
                    }
                    message.channel.send(parseInt(m.content) + 1);
                }
            });
            collector.on("end", collected => {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📝 COUNTING ENDED | Zakończono liczenie`)
                    .setDescription(`Koniec czasu!`)
                    .addField(`Wynik:`, count)
                );
            });

        }
        catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
}







