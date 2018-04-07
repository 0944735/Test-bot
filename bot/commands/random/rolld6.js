const commando = require('discord.js-commando');

class D6RollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'd6roll',
            group: 'random',
            memberName: 'd6roll',
            description: 'Roll a d6'
        });
    }

    async run(message, args){
        var roll = Math.floor(Math.random() * 6) + 1;
        message.reply("You rolled a " + roll);
    }
}

module.exports = D6RollCommand