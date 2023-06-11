import { Events, Message, MessageFlags } from 'discord.js';

export default {
	type: Events.MessageCreate,
	async execute(msg: Message) {
		const matches = msg.content.match(/#[0-9]+/gm);
		if (!matches) return;

		const links = [];

		for (const match of matches) {
			const res = await fetch(
				`https://api.github.com/repos/RedstoneTools/redstonetools-mod/issues/${match.replace(
					'#',
					'',
				)}`,
			);

			if (!res.ok) continue;

			links.push(`<${(await res.json()).html_url}>`);
		}

		if (links.length < 1) return;
		await msg.reply(links.join('\n'));
	},
};
