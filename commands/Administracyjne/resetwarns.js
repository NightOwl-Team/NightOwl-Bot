const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
db = require("quick.db");
module.exports = {
    name: "clear-warn",
    category: "Administracyjne",
    aliases: ["del-warn", "warn-del", "clearwarn", "delwarn"],
    cooldown: 2,
    usage: "clear-warn <uzytkownik>",
    description: "Wysyła embeda",
    run: async (client, message, args, user, text, prefix) => {
        try {


            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Nie posiadasz uprawnień do wykonania tej komendy!");
            }

            const user = message.mentions.members.first()

            if (!user) {
                return message.channel.send("Nie podano użytkownika!");
            }

            if (message.mentions.users.first().bot) {
                return message.channel.send("Boty nie mogą mieć warnów!");
            }


            let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

            if (warnings === null) {
                return message.channel.send(`${message.mentions.users.first().username} Nie posiada żadnych warnów`)
            }

            db.delete(`warnings_${message.guild.id}_${user.id}`)
            user.send(`Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`)
            user.send(new MessageEmbed()
                .setColor(ee.color)
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(`✅ WARN CLEAR | Usunięto warny!`)
                .setDescription(`Zostałes poswiecony i wyzbyłes sie wszystkich swoich warnów!`)
                .setFooter(ee.footertext, ee.footericon)
            )
            await message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(`✅ WARN CLEAR | Usunięto warny!`)
                .setDescription(`${message.mentions.users.first().username} został poswiecony i wyzbył sie wszystkich swoich warnów!`)
                .setFooter(ee.footertext, ee.footericon)
            )
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }

    }
}
