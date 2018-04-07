const commando = require('discord.js-commando');

class thinking extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'thinking',
            group: 'images',
            memberName: 'thinking',
            description: ':thinking:'
        });
    }

    async run(message, args){
        await message.react('🤔')
    }
}



module.exports = thinking;