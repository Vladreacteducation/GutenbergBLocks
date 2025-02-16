/* eslint-disable no-console */
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
// import {
// 	ToolbarGroup,
// 	ToolbarButton,
// 	ToolbarDropdownMenu,
// } from '@wordpress/components';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ColorPicker,
	ColorPalette,
	ToggleControl,
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { text, align } = attributes;
	const onChangeText = (val) => {
		setAttributes({ text: val });
	};
	// back частина редактор
	return (
		<>
			{/* InspectorControls для роботи з сайдбаром */}

			<InspectorControls>
				<PanelBody title="Content" initialOpen>
					<p>TEST</p>
					<TextareaControl
						label="Title"
						value={text}
						help="Insert Title"
						onChange={onChangeText}
					/>
					<ToggleControl label="Yes or No" checked={true} />
					<ColorPicker color={'#000000'} />
					<ColorPalette
						colors={[
							{ name: 'gray', color: '#f5f5f5' },
							{ name: 'black', color: '#00000' },
						]}
					/>
				</PanelBody>
			</InspectorControls>

			{/* // Додає панель інструментів для керування блоком (з кнопками, дропдаунами тощо). */}
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(value) => setAttributes({ align: value })}
				/>
			</BlockControls>
			{/* RichText — це компонент у WordPress (Gutenberg), який дозволяє створювати редагований текст із підтримкою форматування (жирний, курсив, посилання, вирівнювання тощо). */}
			<RichText
				{...useBlockProps({
					className: `leaf-align-${align}`,
				})}
				tagName="h1"
				value={text}
				onChange={onChangeText}
				placeholder={'Введите заголовок'}
				allowedFormats={[]}
				// style={{ textAlign: align }}
			/>
		</>
	);
}
