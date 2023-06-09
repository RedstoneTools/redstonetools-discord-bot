import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import registerEvents from './events/events.js';
import deployCommands from './deploy.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once(Events.ClientReady, async client => {
	console.log(
		`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands%20messages.read`,
	);

	await registerEvents(client);
	await deployCommands(client.user.id);
});

client.login(config.token);
