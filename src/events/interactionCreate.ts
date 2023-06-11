import {
	CacheType,
	ChatInputCommandInteraction,
	Events,
	Interaction,
} from 'discord.js';
import commands from '../commands/commands.js';

export default {
	type: Events.InteractionCreate,
	async execute(interaction: Interaction<CacheType>) {
		if (interaction.isChatInputCommand()) {
			const command = commands.get(interaction.commandName);

			if (!command) {
				console.error(`No such command "${interaction.commandName}"`);
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while executing this command!',
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content: 'There was an error while executing this command!',
						ephemeral: true,
					});
				}
			}
		} else if (interaction.isAutocomplete()) {
			const command = commands.get(interaction.commandName);

			if (!command) {
				console.error(`No such command "${interaction.commandName}"`);
			}

			if (!command.autocomplete)
				return console.error(
					`No autocomplete function found for ${interaction.commandName}`,
				);

			command.autocomplete(interaction);
		}
	},
};
