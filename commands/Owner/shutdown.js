module.exports = {
    name: "shutdown",
    category: "Owner",
    aliases: ["shut", "turnoff"],
    cooldown: 2,
    usage: "turnoff",
    description: "Wylacza bota",
    run: async (client, message, args, user, text, prefix) => {
        try {







            message.reply('Bot zostanie wylaczony.\n'
                + 'Potwierdz uzywajac  `tak` zaprzezstan zywajac  `nie`.');

            // First argument is a filter function - which is made of conditions
            // m is a 'Message' object
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 30000 }).then(collected => {
                    // only accept messages by the user who sent the command
                    // accept only 1 message, and return the promise after 30000ms = 30s

                    // first (and, in this case, only) message of the collection
                    if (collected.first().content.toLowerCase() == 'tak') {
                        message.reply('Shutting down...');
                        client.destroy();
                    }

                    else
                        message.reply('Operation canceled.');
                }).catch(() => {
                    message.reply('No answer after 30 seconds, operation canceled.');
                });

        } catch (e) {
            console.log(e);
        }
    }
}