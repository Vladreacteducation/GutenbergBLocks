/* eslint-disable no-console */
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { text, align } = attributes;
	// back частина редактор
	return (
		<>
			<BlockControls // Додає панель інструментів для керування блоком (з кнопками, дропдаунами тощо).
				controls={[
					{
						title: 'Button',
						icon: 'admin-media',
						isActive: true,
						onClick: () => console.log('Button Clicked'),
					},
					{
						title: 'Button',
						icon: 'admin-customizer',
						isActive: true,
						onClick: () => console.log('Button 2 Clicked'),
					},
				]}
			>
				<AlignmentToolbar />
				{text && (
					// ToolbarGroup — це компонент у WordPress (Gutenberg), який використовується для групування елементів панелі інструментів (наприклад, кнопок, випадаючих списків тощо).
					<ToolbarGroup>
						<p>Aligin</p>
						<ToolbarButton
							tiitle="Align left"
							icon="editor-alignleft"
							onClick={() => console.log('Align Left')}
						/>
						<ToolbarButton
							tiitle="Align Center"
							icon="editor-aligncenter"
							onClick={() => console.log('Align Center')}
						/>
						<ToolbarButton
							tiitle="Align Right"
							icon="editor-alignright"
							onClick={() => console.log('Align Right')}
						/>
						{/* ToolbarDropdownMenu — це компонент у WordPress (Gutenberg), який додає випадаюче меню (dropdown) у панель інструментів блоку */}
						<ToolbarDropdownMenu
							icon="arrow-down-alt2"
							label="More Option"
							controls={[
								{
									title: 'Button 1',
									icon: 'admin-media',
								},
								{
									title: 'Button 2',
									icon: 'admin-media',
								},
							]}
						/>
					</ToolbarGroup>
				)}
				<ToolbarGroup>
					<ToolbarButton tiitle="Test buttin" icon="admin-comments" />
				</ToolbarGroup>
			</BlockControls>
			{/* RichText — це компонент у WordPress (Gutenberg), який дозволяє створювати редагований текст із підтримкою форматування (жирний, курсив, посилання, вирівнювання тощо). */}
			<RichText
				{...useBlockProps()}
				tagName="h1"
				value={text}
				onChange={(value) => setAttributes({ text: value })}
				placeholder={'Введите заголовок'}
				allowedFormats={[]}
			/>
		</>
	);
}
