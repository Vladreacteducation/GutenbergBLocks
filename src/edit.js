/* eslint-disable no-console */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	// back частина редактор
	const { columns } = attributes;
	return (
		<div
			{...useBlockProps({
				className: `the-${columns}-columns`,
			})}
		>
			{/* InspectorControls — це компонент у WordPress, який використовується для додавання налаштувань до блоку в панелі редагування (Sidebar) у редакторі Gutenberg */}
			{/* // InnerBlocks - це компонент у WordPress Gutenberg, який дозволяє вкладати одні блоки всередину інших */}
			<InspectorControls>
				{/* PanelBody —  додає секцію, яку можна згорнути або розгорнути */}
				{/* RangeControl - Повзунок для вибору числових значень */}
				<PanelBody>
					<RangeControl
						label={__('Columns', 'myblocks')}
						min={1}
						max={4}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={['leaf/myblock']}
				orientation="horizontal"
				template={[['leaf/myblock'], ['leaf/myblock']]}
			/>
		</div>
	);
}
