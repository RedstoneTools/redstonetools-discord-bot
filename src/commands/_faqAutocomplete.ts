import { AutocompleteInteraction, CacheType } from 'discord.js';

import { Faq } from '../database.js';

async function autocomplete(interaction: AutocompleteInteraction<CacheType>) {
	const input = interaction.options.getFocused();

	try {
		const results = await Faq.find({
			name: new RegExp(`^${sanitiseRegexInput(input)}`, 'i'),
		});


		Faq.find
		await interaction.respond(
			results.map(choice => ({ name: choice.name, value: choice.name })),
		);

	} catch (err) {
		console.error(err);
		await interaction.respond([]);
	}
}

function sanitiseRegexInput(input: String) {
	return input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export { autocomplete };
