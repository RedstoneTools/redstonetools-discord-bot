import { Schema, model } from 'mongoose';

const Faq = model(
	'Faq',
	new Schema({
		name: { type: String, required: true },
		title: { type: String, required: true },
		content: { type: String, required: true },
	}),
);

export { Faq };
