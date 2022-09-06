const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Test modal')