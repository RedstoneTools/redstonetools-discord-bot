import {
	ActionRowBuilder,
	CacheType,
	ChatInputCommandInteraction,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('create-tag')
		.setDescription('Creates a new tag')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const modal = new ModalBuilder()
			.setCustomId('create-tag')
			.setTitle('Tag Create');

		const nameInput = new TextInputBuilder()
			.setCustomId('name')
			.setLabel('Name: ')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);

		const contentInput = new TextInputBuilder()
			.setCustomId('content')
			.setLabel('Content: ')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true);

		const firstRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				nameInput,
			);

		const secondRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				contentInput,
			);

		modal.addComponents(firstRow, secondRow);

		await interaction.showModal(modal);
	},
};
