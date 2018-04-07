const Discord = require("discord.js");
const commando = require("discord.js-commando");

class userinfo extends commando.Command {
    constructor(client){
        super(client, {
            name: 'userinfo',
            group: 'images',
            memberName: 'userinfo',
            description: 'displays user info'
        });
    }

    async run (message, args){
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Displaying user info")
            .setcolor("#9B59B6")
            .addField("Full Username", message.author.tag)
            .addField("ID", message.author.id)
            .addField("Created at", message.author.createdAt);
        message.channel.send({embed: embed});
    }
}

//module.exports = userinfo;