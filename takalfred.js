const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
token = process.env.TOKY

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// set the instruments from db file
instru = require(path.join(__dirname, 'db', 'instruments.json'))

// set the commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	else if (interaction.customId === 'select_instrument') {
		const command = interaction.client.commands.get("emprunt");
		row = command.list_of_inst(interaction.values[0])
		await interaction.deferUpdate();
		await interaction.editReply({ content: 'Quel '+interaction.values[0]+' ?', ephemeral: true, components: [row] });
	}
	else if (interaction.customId === 'select_idgrave') {
		await interaction.deferUpdate();
		await interaction.editReply({ content: 'Ton emprunt est enregistré, n\'oublie pas de me prévenir quand tu le ramènera (/retour)', ephemeral: true, components: [] });
	}
});

// Login to Discord with your client's token
client.login(token);
