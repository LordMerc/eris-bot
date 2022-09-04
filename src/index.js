const Eris = require('eris');
const bot = Eris(`Bot ${process.env.DISCORD_TOKEN}`);

bot.on('ready', () => console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`));

bot.on('messageCreate', (message) => {
	if (message.content === '!ping') {
		console.log('got a ping?')
		bot.createMessage(message.channel.id, 'Pong!');
	} else if (message.content === '!Hello') {
		bot.createMessage(message.channel.id, 'Choo choo! 🚅');
	}
});

bot.connect();
