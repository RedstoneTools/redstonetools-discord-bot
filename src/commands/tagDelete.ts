import {
	CacheType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
} from 'discord.js';
import { autocomplete } from './_tagAutocomplete.js';

import { Tag } from '../database.js';

export default {
	data: new SlashCommandBuilder()
		.setName('delete-tag')
		.setDescription('Deletes a tag')
		.addStringOption(option =>
			option
				.setName('name')
				.setRequired(true)
				.setDescription('The name of the tag to display')
				.setAutocomplete(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const tag = await Tag.findOneAndDelete({
			name: interaction.options.getString('name'),
		});

		if (!tag)
			return await interaction.reply({
				content: 'No tag by that name was found',
				ephemeral: true,
			});

		await interaction.reply({
			content: `Deleted the "${tag.name}" tag.`,
			ephemeral: true,
		});
	},
	autocomplete,
};
