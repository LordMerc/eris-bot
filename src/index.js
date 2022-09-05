const Eris = require('eris');
const bot = new Eris(`${process.env.DISCORD_TOKEN}`, {intents : []});
const Constants = Eris.Constants;

bot.on('ready', async () => {
	console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`)
	const commands = await bot.getCommands();

    if(!commands.length) {
        bot.createCommand({
            name: "test_chat_input",
            description: "Test command to show how to make commands",
            options: [ //An array of Chat Input options https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
                {
                    "name": "animal", //The name of the option
                    "description": "The type of animal",
                    "type": Constants.ApplicationCommandOptionTypes.STRING, //This is the type of string, see the types here https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
                    "required": true,
                    "choices": [ //The possible choices for the options
                        {
                            "name": "Dog",
                            "value": "animal_dog"
                        },
                        {
                            "name": "Cat",
                            "value": "animal_cat"
                        },
                        {
                            "name": "Penguin",
                            "value": "animal_penguin"
                        }
                    ]
                },
                {
                    "name": "only_smol",
                    "description": "Whether to show only baby animals",
                    "type": Constants.ApplicationCommandOptionTypes.BOOLEAN,
                    "required": false
                }
            ],
            type: Constants.ApplicationCommandTypes.CHAT_INPUT //Not required for Chat input type, but recommended
        }); //Create a chat input command

        bot.createCommand({
            name: "Test User Menu",
            type: Constants.ApplicationCommandTypes.USER
        }); //Create a user context menu

        bot.createCommand({
            name: "Test Message Menu",
			description: "Testing message menu?",
            type: Constants.ApplicationCommandTypes.MESSAGE
        }); //Create a message context menu

        bot.createCommand({
            name: "test_edit_command",
            description: "Test command to show off how to edit commands",
            type: Constants.ApplicationCommandTypes.CHAT_INPUT //Not required for Chat input type, but recommended
        }); //Create a chat input command

        bot.createCommand({
            name: "test_delete_command",
            description: "Test command to show off how to delete commands",
            type: Constants.ApplicationCommandTypes.CHAT_INPUT //Not required for Chat input type, but recommended
        }); //Create a chat input command

        //In practice, you should use bulkEditCommands if you need to create multiple commands
    }
});
bot.on("interactionCreate", (interaction) => {
    if(interaction instanceof Eris.CommandInteraction) {
        switch(interaction.data.name) {
            case "test_edit_command":
                interaction.createMessage("interaction recieved");
                return bot.editCommand(interaction.data.id, {
                    name: "edited_test_command",
                    description: "Test command that was edited by running test_edit_command"
                });
            case "test_delete_command":
                interaction.createMessage("interaction recieved");
                return bot.deleteCommand(interaction.data.id);
            default: {
                return interaction.createMessage("interaction recieved");
            }
        }
    }
});

bot.on('messageCreate', (message) => {
	if (message.content === '!ping') {
		console.log('got a ping?')
		bot.createMessage(message.channel.id, 'Pong!');
	} else if (message.content === '!Hello') {
		bot.createMessage(message.channel.id, 'Choo choo! 🚅');
	}
});

bot.connect();
