import { Schema, model } from 'mongoose';

const Tag = model(
	'Tag',
	new Schema({
		author: { type: String, required: true },
		name: { type: String, required: true },
		content: { type: String, required: true },
		date: { type: Date, default: Date.now },
	}),
);

export { Tag };
