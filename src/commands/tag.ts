import {
	CacheType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import {autocomplete} from './_tagAutocomplete.js';

import { Tag } from '../database.js';

export default {
	data: new SlashCommandBuilder()
		.setName('tag')
		.setDescription('Displays a tag')
		.addStringOption(option =>
			option
				.setName('name')
				.setRequired(true)
				.setDescription('The name of the tag to display')
				.setAutocomplete(true),
		),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const tag = await Tag.findOne({
			name: interaction.options.getString('name'),
		});

		if (!tag)
			return await interaction.reply({
				content: 'No tag by that name was found',
				ephemeral: true,
			});

		const reply = new EmbedBuilder()
			.setTitle(tag.name)
			.setDescription(tag.content);
		await interaction.reply({ embeds: [reply] });
	},
	autocomplete: autocomplete,
};
