import {
	CacheType,
	ChatInputCommandInteraction,
	Collection,
	SlashCommandBuilder,
} from 'discord.js';
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

type CommandExecuteFunction = (
	interaction: ChatInputCommandInteraction<CacheType>,
) => Promise<void>;

interface Command {
	data: SlashCommandBuilder;
	execute: CommandExecuteFunction;
}

const commands = new Collection<string, CommandExecuteFunction>();

const commandFiles = await fs.promises.readdir(__dirname);

for (const commandFile of commandFiles) {
	if (commandFile.startsWith('_')) continue;
	if (commandFile === 'commands.js') continue;
	const command: Command = (await import(path.join(__dirname, commandFile)))
		.default;

	commands.set(command.data.name, command.execute);
}

export default commands;
