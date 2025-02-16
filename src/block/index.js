//  реєстрування дочірніх блоків
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
registerBlockType('leaf/myblock', {
	title: __('My Block', 'myblocks'),
	description: __('Single Block', 'myblocks'),
	icon: 'universal-access',
	parent: ['leaf/myblocks'],
	supports: {
		html: false,
		reusable: false,
	},
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		image_url: {
			type: 'string',
			source: 'attribute',
			select: 'img',
			attribute: 'src',
		},
		image_alt: {
			type: 'string',
			source: 'attribute',
			select: 'img',
			attribute: 'alt',
			default: '',
		},
	},
	edit: Edit,
	save: Save,
});
