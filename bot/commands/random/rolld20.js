const commando = require('discord.js-commando');

class D20RollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'd20roll',
            group: 'random',
            memberName: 'd20roll',
            description: 'Roll a d20'
        });
    }

    async run(message, args){
        var roll = Math.floor(Math.random() * 20) + 1;
        message.reply("You rolled a " + roll);
    }
}



module.exports = D20RollCommand;