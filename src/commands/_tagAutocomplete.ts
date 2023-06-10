import { AutocompleteInteraction, CacheType } from 'discord.js';

import { Tag } from '../database.js';

async function autocomplete(interaction: AutocompleteInteraction<CacheType>) {
	const results = await Tag.find({
		name: new RegExp(`^${interaction.options.getFocused()}`, 'i'),
	});
	await interaction.respond(
		results.map(choice => ({ name: choice.name, value: choice.name })),
	);
}

export { autocomplete };
