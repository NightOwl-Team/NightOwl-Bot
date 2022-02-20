const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const db = require("quick.db");
const fs = require("fs");
module.exports = {
    name: "settings",
    category: "Ogólne",
    aliases: ["ustawienia", "setup"],
    cooldown: 2,
    usage: "settings <parametr> <wartosc>",
    description: "Ustawienia bota",
    run: async (client, message, args, user, text, prefix) => {
        //get guild id
        const guild = message.guild.id;
        //get prefix from db
        let prefixes = db.fetch(`prefix_${guild}`);
        if (prefixes == null) {
            prefixes = config.prefix;
        }
        //fetch welcome channel from db
        let welcomechannel = db.fetch(`welcomechannel_${guild}`);
        if (welcomechannel == null) {
            welcomechannel = "brak";
        }
        //fetch welcome message from db
        let welcomemessage = db.fetch(`welcomemessage_${guild}`);
        if (welcomemessage == null) {
            welcomemessage = "Witaj na serwerze!";
        }
        //fetch leave channel from db
        let leavechannel = db.fetch(`leavechannel_${guild}`);
        if (leavechannel == null) {
            leavechannel = "brak";
        }
        //fetch leave message from db
        let leavemessage = db.fetch(`leavemessage_${guild}`);
        if (leavemessage == null) {
            leavemessage = "brak";
        }
        //fetch if user wants to help with settings command
        let help = db.fetch(`helpsettings_${guild}`);
        if (help == null) {
            help = "Tak";
        }
        //if user dont have perms to manage server return
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Brak uprawnień!`)
            .setDescription(`Nie masz uprawnień do użycia tej komendy!`)
        );
        //if no args return
        if (!args[0]) {
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Ustawienia - ${message.guild.name}`)
                .setDescription(`Użycie: ${prefix}settings <parametr> <wartosc>`)
                .addField(`Prefix:`, `${prefixes}`)
                .addField(`Kanał powitań:`, `${welcomechannel}`)
                .addField(`Wiadomość powitalna:`, `${welcomemessage}`)
                .addField(`Kanał opusczających ${leavechannel}`)
                .addField(`Wiadomość opuszczenia:`, `${leavemessage}`)
                .addField(`Pomoc przy komendzie settings (dodadkowa wiadmość): `, `${help}`)
            );
            if (help = "Nie") return;
            message.channel.sendd(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Ustawienia - Używanie komend`)
                .setDescription(`Tu dowiesz się jak poprawnie używać komendy settings`)
                .addField(`Ustawianie prefixu:`, `**${prefix}settings prefix <twój nowy prefix>**`)
                .addField(`Ustawianie kanału powitania:`, `**${prefix}settings welcomechannel <nazwa kanału>**`)
                .addField(`Ustawianie wiadomości powitalnej:`, `**${prefix}settings welcomemessage <treść wiadomości>**`)
                .addField(`Ustawianie kanału opuszczającego:`, `**${prefix}settings leavechannel <nazwa kanału>**`)
                .addField(`Ustawianie wiadomości opuszczającej:`, `**${prefix}settings leavemessage <treść wiadomości>**`)
                .addField(`Ustawianie pomocy przy komendzie settings:`, `**${prefix}settings settingshelp <tak/nie>**`)
            );


        }
        //if user want to change prefix
        if (args[0] == "prefix") {
            //check if user writed his new preifx if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Prefix - ${message.guild.name}`)

                    .setDescription(`Psst. Aby zmienić prefix użyj komendy: **${prefix}settings prefix <nowy prefix>**`)
                    .addField(`Aktualny prefix:`, `${prefixes}`)
                );
            }
            db.set(`prefix_${guild}`, args[1]);
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Prefix zmieniony!`)
                .setDescription(`Prefix został zmieniony na: ${args[1]}`)
            );
        }
        //if user want to change welcome channel
        if (args[0] == "welcomechannel") {
            //check if user writed his new channel if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Kanał powitania - ${message.guild.name}`)
                    .setDescription(`Psst. Aby zmienić kanał powitania użyj komendy: **${prefix}settings welcomechannel <nazwa kanału>**`)
                    .addField(`Aktualny kanał:`, `<#${welcomechannel}>`)
                );
            }
            db.set(`welcomechannel_${guild}`, args[1]);
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Kanał powitania zmieniony!`)
                .setDescription(`Kanał powitania został zmieniony na: ${args[1]}`)
            );
        }
        //if user want to change welcome message
        if (args[0] == "welcomemessage") {
            //check if user writed his new message if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Wiadomość powitalna - ${message.guild.name}`)
                    .setDescription(`Psst. Aby zmienić wiadomość powitalną użyj komendy: **${prefix}settings welcomemessage <treść wiadomości>**`)
                    .addField(`Aktualna wiadomość:`, `${welcomemessage}`)
                );
            }
            db.set(`welcomemessage_${guild}`, args[1]);
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Wiadomość powitalna zmieniona!`)
                .setDescription(`Wiadomość powitalna została zmieniona na: ${args[1]}`)
            );
        }
        //if user want to change leave channel
        if (args[0] == "leavechannel") {
            //check if user writed his new channel if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Kanał opuszczający - ${message.guild.name}`)
                    .setDescription(`Psst. Aby zmienić kanał opuszczający użyj komendy: **${prefix}settings leavechannel <nazwa kanału>**`)
                    .addField(`Aktualny kanał:`, `<#${leavechannel}>`)
                );
            }
            db.set(`leavechannel_${guild}`, args[1]);
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Kanał opuszczający zmieniony!`)
                .setDescription(`Kanał opuszczający został zmieniony na: ${args[1]}`)
            );
        }
        //if user want to change leave message
        if (args[0] == "leavemessage") {
            //check if user writed his new message if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Wiadomość opuszczająca - ${message.guild.name}`)
                    .setDescription(`Psst. Aby zmienić wiadomość opuszczającą użyj komendy: **${prefix}settings leavemessage <treść wiadomości>**`)
                    .addField(`Aktualna wiadomość:`, `${leavemessage}`)
                );
            }
            db.set(`leavemessage_${guild}`, args[1]);
            //send message
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`Wiadomość opuszczająca zmieniona!`)
                .setDescription(`Wiadomość opuszczająca została zmieniona na: ${args[1]}`)
            );
        }
        //if user want to change help message
        if (args[0] == "settingshelp") {
            //check if user writed his new message if not show him actual
            if (!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Pomoc - ${message.guild.name}`)
                    .setDescription(`Psst. Aby zmienić pomoc użyj komendy: **${prefix}settings settingshelp <treść wiadomości>**`)
                    .addField(`Pomoc przy komendzie settings:`, `${settingshelp}`)
                );
            }
            //check if user writed Tak or Nie if not show him actual
            if (args[1] == "Tak") {
                db.set(`settingshelp_${guild}`, "Tak");
                //send message
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Pomoc w settings!`)
                    .setDescription(`Teraz znowu będe ci pomagał w komendzie settings!`)
                );
            }

            if (args[1] == "Nie") {
                db.set(`settingshelp_${guild}`, "Nie");
                //send message
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Pomoc w settings`)
                    .setDescription(`Teraz nie będę ci pomagał w komendzie settings!`)
                );
            }
        }
    }
}