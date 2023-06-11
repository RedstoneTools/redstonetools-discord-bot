import {
	CacheType,
	Events,
	Interaction,
	Message,
	MessageFlags,
} from 'discord.js';

import { Faq } from '../database.js';

export default {
	type: Events.InteractionCreate,
	async execute(interaction: Interaction<CacheType>) {
		if (!interaction.isModalSubmit()) return;

		if (interaction.customId !== 'create-faq') return;

		try {
			const faq = await Faq.findOneAndUpdate(
				{
					name: interaction.fields.getTextInputValue('name'),
				},
				{
					title: interaction.fields.getTextInputValue('title'),
					content: interaction.fields.getTextInputValue('content'),
				},
				{ upsert: true, new: true },
			);
			await interaction.reply({
				content: `Created the "${faq.name}" faq`,
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
