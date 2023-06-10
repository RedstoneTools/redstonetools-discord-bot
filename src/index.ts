import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import registerEvents from './events/events.js';
import deployCommands from './deploy.js';
import mongoose from 'mongoose';

await mongoose.connect(config.mongo);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async client => {
	console.log(
		`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
	);

	await registerEvents(client);
	await deployCommands(client.user.id);
});

client.login(config.token);
