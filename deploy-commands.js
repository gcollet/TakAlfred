const { REST, SlashCommandBuilder, Routes } = require('discord.js');
proccess.env.CLIENT_ID
const clientId = CLIENT_ID
proccess.env.GUILD_ID
const guildId = GUILD_ID
proccess.env.TOKY
const token = TOKY

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
