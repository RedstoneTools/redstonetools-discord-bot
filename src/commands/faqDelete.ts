import {
	CacheType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
} from 'discord.js';
import { autocomplete } from './_faqAutocomplete.js';

import { Faq } from '../database.js';

export default {
	data: new SlashCommandBuilder()
		.setName('delete-faq')
		.setDescription('Deletes a faq')
		.addStringOption(option =>
			option
				.setName('name')
				.setRequired(true)
				.setDescription('The name of the faq to display')
				.setAutocomplete(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const faq = await Faq.findOneAndDelete({
			name: interaction.options.getString('name'),
		});

		if (!faq)
			return await interaction.reply({
				content: 'No faq by that name was found',
				ephemeral: true,
			});

		await interaction.reply({
			content: `Deleted the "${faq.name}" faq.`,
			ephemeral: true,
		});
	},
	autocomplete,
};
