import { Schema, model } from 'mongoose';

const Tag = model(
	'Tag',
	new Schema({
		name: { type: String, required: true },
		content: { type: String, required: true },
	}),
);

export { Tag };
