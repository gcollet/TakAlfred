const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emprunt')
		.setDescription('J\'ai pris un instrument'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Instrument')
					.addOptions(
						{
							label: 'Agogo',
							description: 'My ding ding dong',
							value: 'agogo',
						},
						{
							label: 'Répinique',
							description: 'Takalikatakalikata',
							value: 'repinique',
						},
                        {
							label: 'Chocalho',
							description: 'tchikitchikitchikitchik',
							value: 'chocalho',
						},
                        {
							label: 'Caïxa',
							description: '1..41..41..41..41.. Phrase 2',
							value: 'caixa',
						},
                        {
							label: 'Tamborim',
							description: 'Le pouvoir de la mèche',
							value: 'tamborim',
						},
                        {
							label: 'Surdo',
							description: 'Pim, Pam et Poum sont sur un bateau',
							value: 'surdo',
						},
					),
			);
		await interaction.reply({ content: 'Choisi un instrument à emprunter', components: [row] });
	},
};
