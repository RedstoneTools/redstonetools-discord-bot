import {
	CacheType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import { autocomplete } from './_faqAutocomplete.js';

import { Faq } from '../database.js';

export default {
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Displays a faq')
		.addStringOption(option =>
			option
				.setName('name')
				.setRequired(true)
				.setDescription('The name of the faq to display')
				.setAutocomplete(true),
		),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const faq = await Faq.findOne({
			name: interaction.options.getString('name'),
		});

		if (!faq)
			return await interaction.reply({
				content: 'No faq by that name was found',
				ephemeral: true,
			});

		const reply = new EmbedBuilder()
			.setTitle(faq.title)
			.setDescription(faq.content);
		await interaction.reply({ embeds: [reply] });
	},
	autocomplete: autocomplete,
};
