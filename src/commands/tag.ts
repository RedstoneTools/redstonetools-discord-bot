import {
	AutocompleteInteraction,
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';

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

		if (!tag) return;

		await interaction.reply(tag.content);
	},
	async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
		const results = await Tag.find({
			name: new RegExp(`^${interaction.options.getFocused()}`, 'i'),
		});
		await interaction.respond(
			results.map(choice => ({ name: choice.name, value: choice.name })),
		);
	},
};
