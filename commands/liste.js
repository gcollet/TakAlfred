const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('node:path');
instru = require(path.join(__dirname, '../db', 'instruments.json'))
// Construct list of instruments in takabox
const takabox = [{ name: 'Dans la TakaBox :', value: '\u200b', inline: false }]
for(let i in instru.Disponibles) {
    label = instru.Disponibles[i].label
    valeurs = instru.Disponibles[i].valeurs
    id_list = ""
    for(let j in valeurs) { 
        id_list = id_list + valeurs[j] + '\n'
    }
    takabox.push({name: label, value: id_list, inline: true}); 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('liste')
		.setDescription('Liste les instruments'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Liste des instruments')
            .addFields(
                takabox
            );
		await interaction.reply({ content: '', embeds: [embed], components: [] });
	},
};
