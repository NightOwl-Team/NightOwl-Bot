const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "eval",
    category: "Owner",
    aliases: ["e"],
    cooldown: 2,
    usage: "eval <comm> <arg>",
    description: "EVAL COMMAND ONLY FOR DEV",
    run: async (client, message, args, user, text, prefix) => {

        //create eval command
        if (!message.member.id == config.owner)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie masz permisji`)

            );
        if (!args[0])
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | Nie podales komendy `)
            );

        const clean = async (text) => {
            // If our input is a promise, await it before continuing
            if (text && text.constructor.name == "Promise")
                text = await text;

            // If the response isn't a string, `util.inspect()`
            // is used to 'stringify' the code in a safe way that
            // won't error out on objects with circular references
            // (like Collections, for example)
            if (typeof text !== "string")
                text = require("util").inspect(text, { depth: 1 });

            // Replace symbols with character code alternatives
            text = text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));

            // Send off the cleaned up result
            return text;
        }


        const args = message.content.split(" ").slice(1);

        // The actual eval command
        if (message.content.startsWith(`${config.prefix}eval`)) {

            // If the message author's ID does not equal
            // our ownerID, get outta there!
            if (message.author.id !== config.ownerID)
                return;

            // In case something fails, we to catch errors
            // in a try/catch block
            try {
                // Evaluate (execute) our input
                const evaled = eval(args.join(" "));

                // Put our eval result through the function
                // we defined above
                const cleaned = await clean(evaled);

                // Reply in the channel with our result
                message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
            } catch (err) {
                // Reply in the channel with our error
                message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
            }
        }
    }
}




