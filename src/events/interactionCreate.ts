import { CacheType, ChatInputCommandInteraction, Events } from 'discord.js';
import commands from '../commands/commands.js';

export default {
	type: Events.InteractionCreate,
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		if (!interaction.isChatInputCommand()) return;

		const command = commands.get(interaction.commandName);

		if (!command) {
			console.error(`No such command "${interaction.commandName}"`);
		}

		try {
			await command(interaction);
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
	},
};
