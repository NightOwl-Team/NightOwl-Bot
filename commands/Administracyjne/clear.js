const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "clear",
    category: "Administracyjne",
    aliases: ["cls"],
    cooldown: 2,
    usage: "clear <ilosc wiad>",
    description: "Wysyła embeda",
    run: async (client, message, args, user, text, prefix) => {
        try {
            //check if the user has the permission to use this command
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie masz permisji`)
                );
            if (isNaN(args[0]))
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie podales liczby wiadomosci`)
                    .setDescription(`Usage: \`${prefix}${this.usage}\``)
                );
            if (args[0] > 100)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`❌ ERROR | Nie mozesz wyczyscic wiecej niz 100 wiadomosci`)
                    .setDescription(`Usage: \`${prefix}${this.usage}\``)
                );
            message.channel.bulkDelete(args[0]);
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ CLEAR | Wszystkie wiadomosci zostaly usuniete`)
                .setDescription(`Usunieto: ${args[0]} wiadomosci`)
            )



        }
        catch (err) {
            console.log(err);
            message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Wystapil blad`)
                .setDescription(`${err}`)
            )
        }
    }
}



