import { AutocompleteInteraction, CacheType } from 'discord.js';

import { Faq } from '../database.js';

async function autocomplete(interaction: AutocompleteInteraction<CacheType>) {
	try {
		const results = await Faq.find({
			name: new RegExp(`^${interaction.options.getFocused()}`, 'i'),
		});
		await interaction.respond(
			results.map(choice => ({ name: choice.name, value: choice.name })),
		);

	} catch (err) {
		console.error(err);
		await interaction.respond([]);
	}
}

export { autocomplete };
