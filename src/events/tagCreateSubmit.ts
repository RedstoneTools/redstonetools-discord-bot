import {
	CacheType,
	Events,
	Interaction,
	Message,
	MessageFlags,
} from 'discord.js';

import { Tag } from '../database.js';

export default {
	type: Events.InteractionCreate,
	async execute(interaction: Interaction<CacheType>) {
		if (!interaction.isModalSubmit()) return;

		if (interaction.customId !== 'create-tag') return;

		try {
			const tag = await Tag.findOneAndUpdate(
				{
					name: interaction.fields.getTextInputValue('name'),
				},
				{ content: interaction.fields.getTextInputValue('content') },
				{ upsert: true, new: true },
			);
			await interaction.reply({
				content: `Created the "${tag.name}" tag`,
				ephemeral: true,
			});
		} catch (err) {
			await interaction.reply({
				content: `Something went wrong`,
				ephemeral: true,
			});
			console.error(err);
		}
	},
};
