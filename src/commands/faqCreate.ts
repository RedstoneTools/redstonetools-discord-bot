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
		.setName('create-faq')
		.setDescription('Creates a new faq')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const modal = new ModalBuilder()
			.setCustomId('create-faq')
			.setTitle('Faq Create');

		const nameInput = new TextInputBuilder()
			.setCustomId('name')
			.setLabel('Name: ')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);

		const titleInput = new TextInputBuilder()
			.setCustomId('title')
			.setLabel('Title: ')
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
				titleInput,
			);
		const thirdRow =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				contentInput,
			);

		modal.addComponents(firstRow, secondRow, thirdRow);

		await interaction.showModal(modal);
	},
};
