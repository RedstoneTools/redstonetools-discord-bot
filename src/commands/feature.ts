import {
	CacheType,
	ChannelType,
	ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';

import config from '../config.json' assert { type: 'json' };

export default {
	data: new SlashCommandBuilder()
		.setName('feature')
		.setDescription('Denies or approves feature requests.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads)
		.setDMPermission(false)
		.addSubcommand(subcmd =>
			subcmd.setName('approve').setDescription('Approves a feature request.'),
		)
		.addSubcommand(subcmd =>
			subcmd
				.setName('deny')
				.setDescription('Denies a feature request.')
				.addStringOption(option =>
					option
						.setName('reason')
						.setDescription('Why the feature request was denied')
						.setRequired(true)
						.addChoices(
							{
								name: 'Duplicate',
								value: 'duplicate',
							},
							{
								name: 'Other',
								value: 'denied',
							},
						),
				),
		),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const parent = interaction.channel.parent;
		if (!parent || parent.id !== config.featureRequestsId)
			return await interaction.reply({
				content: 'This is not the feature requests channel.',
				ephemeral: true,
			});

		if (parent.type !== ChannelType.GuildForum) return;
		if (!interaction.channel.isThread()) return;

		if (interaction.options.getSubcommand() === 'approve') {
			const approvedTag = parent.availableTags.find(
				t => t.name.toLowerCase() === 'approved',
			);

			await interaction.channel.setAppliedTags([
				...interaction.channel.appliedTags,
				approvedTag.id,
			]);

			return await interaction.reply('Approved this feature.');
		}

		const tagToApply = parent.availableTags.find(
			t => t.name.toLowerCase() === interaction.options.getString('reason'),
		);

		await interaction.channel.setAppliedTags([
			...interaction.channel.appliedTags,
			tagToApply.id,
		]);

		await interaction.reply('Denied this feature.');

		await interaction.channel.setArchived();
	},
};
