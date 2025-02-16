import { registerBlockType } from '@wordpress/blocks';
import './block'; // для підключення блоку
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('leaf/myblocks', {
	edit: Edit,
	save: Save,
});
