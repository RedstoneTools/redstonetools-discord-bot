import { REST, Routes } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';
const { token, guildId } = config;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const commands = [];

const commandFiles = await fs.promises.readdir(
	path.join(__dirname, 'commands'),
);

for (const commandFile of commandFiles) {
	if (commandFile.startsWith('_')) continue;
	if (commandFile === 'commands.js') continue;
	const command = (await import(path.join(__dirname, 'commands', commandFile)))
		.default;

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

export default async function deployCommands(clientId: string) {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`,
		);

		const data: any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`,
		);
	} catch (error) {
		console.error(error);
	}
}
