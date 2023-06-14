import { ChannelType, Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import registerEvents from './events/events.js';
import deployCommands from './deploy.js';
import mongoose from 'mongoose';

import { githubApp as app } from './github.js';
import { DiscordGitHubSync } from './database.js';

await mongoose.connect(config.mongo);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

app.webhooks.on('issues.closed', async ({ payload }) => {
	const discordGithubSync = await DiscordGitHubSync.findOne({
		issueNumber: payload.issue.number,
	});

	if (!discordGithubSync) return;

	const channel = await client.channels.fetch(discordGithubSync.channelId);

	if (!channel) return;

	if (!channel.isThread()) return;

	if (channel.parent.type !== ChannelType.GuildForum) return;

	const implementedTag = channel.parent.availableTags.find(
		t => t.name.toLowerCase() === 'implemented',
	);

	if (!implementedTag) return;

	await channel.setAppliedTags([...channel.appliedTags, implementedTag.id]);

	await channel.send(
		`This feature is marked as implemented <${payload.issue.html_url}>`,
	);

	await channel.setLocked();
});

client.once(Events.ClientReady, async client => {
	console.log(
		`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands%20messages.read`,
	);

	await registerEvents(client);
	await deployCommands(client.user.id);
});

client.login(config.token);
