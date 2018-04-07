//const Discord = require('discord.js'),
    cheerio = require('cheerio'),
    commando = require('discord.js-commando'),
    querystring = require ('querystring'),
    request = require('snekfetch'),
    {googleapikey, imageEngineKey} = require('auth.json'),
    {deleteCommandMessages} = require('util.js');

 class searchimage extends commando.Command {
    constructor (client){
        super(client, {
            'name': 'searchimage',
            'memberName': 'searchimage',
            'group': 'search',
            'description': 'Search for images',
            'aliases': ['si', 'img'],
            'format': 'ImageQuery',
            'examples': ['searchimage Ainsley Harriot'],
            'guildOnly': false,
            'args': [
                {
					'key': 'query',
					'prompt': 'What do you want to find images of?',
					'type': 'string'
                }
            ]
        });
    }

    async run(msg, args){
        const embed = new Discord.MessageEmbed(),
            query = args.query
                .replace(/(who|what|when|where) ?(was|is|were|are) ?/gi, '')
                .split(' ')
                .map(x => encodeURIComponent(x))
                .join('+'),
            safe = msg.channel.nsfw ? 'medium' : 'off',
            QUERY_PARAMS = {
                'cx': imageEngineKey,
                'key': googleapikey,
                safe,
                'searchType': 'image'
            };
        let res = await request.get(`https://www.googleapis.com/customsearch/v1?${querystring.stringify(QUERY_PARAMS)}&q=${encodeURI(query)}`);


		if (res && res.body.items) {
			embed
				.setColor(msg.guild ? msg.member.displayHexColor : '#FF0000')
				.setImage(res.body.items[0].link)
				.setFooter(`Search query: "${args.query}"`);

			deleteCommandMessages(msg, this.client);

            return msg.embed(embed);
        }
		if (!res) {
			res = await request.get(`https://www.google.com/search?tbm=isch&gs_l=img&safe=${safe}&q=${encodeURI(query)}`);

			const $ = cheerio.load(res.text),
				result = $('.images_table').find('img')
					.first()
					.attr('src');

			embed
				.setColor(msg.guild ? msg.member.displayHexColor : '#FF0000')
				.setImage(result)
				.setFooter(`Search query: "${args.query}"`);

			deleteCommandMessages(msg, this.client);

			return msg.embed(embed).catch(console.error);
		}

		deleteCommandMessages(msg, this.client);

        return msg.reply(' ***NO IMAGE WAS FOUND*** ').catch(console.error);
        
        client.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));
	}
}