const commando = require('discord.js-commando');


class DiscordAvatar extends commando.Command{
    constructor (client){
        super(client,{
            name: 'avatar',
            group: 'images',
            memberName: 'avatar',
            description: 'Shows the avatar of an user'
        });
    }
    
    async run(message, args) {
        let msg = await message.channel.send("Avatar loading......");
        let target = message.mentions.users.first() || message.author;

        await message.channel.send( {file:[
            {
                attachment: target.displayAvatarURL,
                name: "avatar.png"
            }
        ]});
        
        msg.delete();
    }
}

//module.exports = DiscordAvatar;