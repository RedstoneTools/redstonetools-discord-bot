import { Schema, model } from 'mongoose';

const Faq = model(
	'Faq',
	new Schema({
		name: { type: String, required: true },
		title: { type: String, required: true },
		content: { type: String, required: true },
	}),
);

const DiscordGitHubSync = model(
	'DiscordGitHubSync',
	new Schema({
		issueNumber: { type: Number, required: true },
		channelId: { type: String, required: true },
	}),
);

export { Faq, DiscordGitHubSync };
