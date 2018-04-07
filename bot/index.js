const Discord = require('discord.js');
const commando = require('discord.js-commando');
const bot = new commando.Client();
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('images', 'Images');
bot.registry.registerGroup('search', 'Search');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");



client.on('message' , msg =>{
    var msg = msg.content.toUpperCase();
    if (msg.includes('thinking')){
        msg.react('🤔')
    }
});

client.login('NDMxNDIzNjU0NzgyNDM1MzMw.DaezeQ.p9R6jai05flYWB0cnVBr6eliqPk')
bot.login('NDMxNDIzNjU0NzgyNDM1MzMw.DaezeQ.p9R6jai05flYWB0cnVBr6eliqPk');