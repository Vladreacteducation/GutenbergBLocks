import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
export default function Save({ attributes }) {
	// front частина після збереження

	const { columns } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: `the-${columns}-columns`,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}
