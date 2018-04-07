const commando = require('discord.js-commando');

class HeheBoi extends commando.Command{
    constructor(client){
        super(client, {
            name: 'boi',
            group: 'images',
            memberName: 'boi',
            description: "HEHE BOI"
        });
    }

    async run(message, args){
        message.channel.send( message.author.toString(), {
            file: "https://i.imgur.com/2wikZvy.gif"
        });
    }
}


module.exports = HeheBoi;