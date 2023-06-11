import fs from 'fs';
import path from 'path';
import { Client, ClientEvents, Events } from 'discord.js';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

interface EventHandler {
	type: keyof ClientEvents;
	once: boolean | undefined;
	execute: Function;
}

const eventFiles = await fs.promises.readdir(__dirname);

export default async function registerEvents(client: Client<true>) {
	for (const eventFile of eventFiles) {
		if (eventFile.startsWith('_')) continue;
		if (eventFile === 'events.js') continue;
		const eventHandler: EventHandler = (
			await import(path.join(__dirname, eventFile))
		).default;

		if (eventHandler.once) {
			client.once(eventHandler.type, (...args) =>
				eventHandler.execute(...args),
			);
		} else {
			client.on(eventHandler.type, (...args) => eventHandler.execute(...args));
		}
	}
}
