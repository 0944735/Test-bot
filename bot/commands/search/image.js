const Discord = require('discord.js'),
	cheerio = require('cheerio'),
	commando = require('discord.js-commando'),
	querystring = require('querystring'),
	request = require('snekfetch'),
	{deleteCommandMessages} = require('util.js'),
	{googleapikey, imageEngineKey} = require('auth.json');

class imageCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'image',
			'memberName': 'image',
			'group': 'search',
			'aliases': ['img', 'i'],
			'description': 'Finds an image through google',
			'format': 'ImageQuery',
			'examples': ['image Pyrrha Nikos'],
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

	async run (msg, args) {
		const embed = new Discord.MessageEmbed(),
			query = args.query
				.replace(/(who|what|when|where) ?(was|is|were|are) ?/gi, '')
				.split(' ')
				.map(x => encodeURIComponent(x))
				.join('+'),
			safe = msg.channel.nsfw ? 'medium' : 'off',
			QUERY_PARAMS = { // eslint-disable-line sort-vars
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

			return msg.embed(embed);
		}

		deleteCommandMessages(msg, this.client);

		return msg.reply('⚠️ ***nothing found***');
	}
};