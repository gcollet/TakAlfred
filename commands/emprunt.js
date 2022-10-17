const path = require('node:path');
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
instru = require(path.join(__dirname, '../db', 'instruments.json'))

// Construct list of instruments
const avail_instru = []
for(let i in instru.Disponibles) { 
    avail_instru.push({label:instru.Disponibles[i].label, value:instru.Disponibles[i].value}); 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emprunt')
		.setDescription('J\'emprunte un instrument'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select_instrument')
					.setPlaceholder('Instrument')
					.addOptions(avail_instru),
			);
		await interaction.reply({ content: 'Quel type d\'instrument ?', ephemeral: true, components: [row] });
    },
    list_of_inst(type_of_inst){
        const avail_id = []
        for(let i in instru.Disponibles[type_of_inst].valeurs) { 
            avail_id.push({label:instru.Disponibles[type_of_inst].valeurs[i], value:instru.Disponibles[type_of_inst].valeurs[i]}); 
        };
        const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select_idgrave')
					.setPlaceholder('IDgrave')
					.addOptions(avail_id),
			);
        return row
    }
};
