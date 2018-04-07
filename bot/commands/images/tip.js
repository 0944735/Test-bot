const commando = require('discord.js-commando');

class tipthefedora extends commando.Command{
    constructor(client){
        super(client, {
            name: 'tip',
            group: 'images',
            memberName: 'tip',
            description: "m'lady"
        });
    }

    async run(message, args){
        message.channel.send( message.author.toString() + ' *tips* ', {
            file: "https://i.imgur.com/Nu1P2Qp.jpg"
        });
    }
}


module.exports = tipthefedora;