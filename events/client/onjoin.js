const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = client => {

    //send message when somone join the server
    client.on("guildMemberAdd", async member => {
        //get guild id
        const guild = member.guild.id;
        const guildSettings = require(`../../botconfig/guilds/${guild}.json`);

        //get the join message
        //get channel id
        const channel = guildSettings.welcomeChannel;
        //get welcome message
        const welcomeMessage = guildSettings.welcomeMessage;
        //send the message in the channel
        const channelToSend = client.channels.cache.get(channel);
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Witaj na serwerze ${member.user.username}!`)
            .setDescription(welcomeMessage)
            .setFooter(ee.footertext, ee.footericon)
        channelToSend.send(embed);

    });



}
