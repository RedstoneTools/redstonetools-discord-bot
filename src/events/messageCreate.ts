import { Events, Message, MessageFlags } from 'discord.js';

export default {
	type: Events.MessageCreate,
	async execute(msg: Message) {
		const matches = msg.content.match(/#[0-9]+/gm);
		if (!matches) return;

		const links = [];

		console.log(matches);

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

		await msg.reply(links.join('\n'));
	},
};
