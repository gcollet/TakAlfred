const path = require('node:path');
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
instru = require(path.join(__dirname, '../db', 'instruments.json'))
const avail_instru = []
for(let i in instru.Disponibles) { 
    avail_instru.push({label:instru.Disponibles[i].label, description:instru.Disponibles[i].description, value:instru.Disponibles[i].value}); 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emprunt')
		.setDescription('J\'ai pris un instrument'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select_instrument')
					.setPlaceholder('Instrument')
					.addOptions(avail_instru),
			);
		await interaction.reply({ content: 'Choisi un instrument à emprunter', ephemeral: true, components: [row] });
	},
};
