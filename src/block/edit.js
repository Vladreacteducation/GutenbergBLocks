import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Spinner,
	ToolbarButton,
	PanelBody,
	TextControl,
} from '@wordpress/components'; // для завантаження картинки
import { isBlobURL } from '@wordpress/blob';
// MediaPlaceholder для завантаження медіа, але не для виводу
export default function Edit({ attributes, setAttributes }) {
	const { title, description, image_id, image_url, image_alt } = attributes;

	const onSelectURL = (val) => {
		setAttributes({
			image_id: undefined,
			image_url: val,
			image_alt: '',
		});
	};

	const onSelect = (val) => {
		setAttributes({
			image_id: val.id,
			image_url: val.url,
			image_alt: val.alt,
		});
	};

	return (
		<>
			{image_url &&
				!isBlobURL(image_url)(
					<InspectorControls>
						<PanelBody title={__('Settings for image', 'myblocks')}>
							<TextControl
								label={__('Change Alt', 'myblocks')}
								value={image_alt}
								help={__('Change alt text', 'myblock')}
								onChange={(val) =>
									setAttributes({ image_alt: val })
								}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			{image_url && (
				<BlockControls>
					{/* MediaReplaceFlow - для заміни картинки */}
					<MediaReplaceFlow
						name={__('Replace image', 'myblocks')}
						// for update img for library or desktop
						onSelect={onSelect}
						// for insert url
						onSelectURL={onSelectURL}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={image_id}
						mediaURL={image_url}
					/>
					{/* ToolbarButton - добавлення кнопки вище наведеного елементу для видалення картинки */}
					<ToolbarButton
						onClick={() =>
							setAttributes({
								image_id: undefined,
								image_url: undefined,
								image_alt: '',
							})
						}
					>
						{__('Remove Image', 'myblocks')}
					</ToolbarButton>
				</BlockControls>
			)}

			<div {...useBlockProps()}>
				{/* onSelect параметри для картинки */}
				{image_url && (
					<div
						className={`image ${isBlobURL(image_url) ? 'is-loading' : 'loaded'}`}
					>
						{' '}
						<img src={image_url} alt={image_alt} id={image_id} />
						{isBlobURL(image_url) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					// for update img for library or desktop
					onSelect={onSelect}
					// for insert url
					onSelectURL={onSelectURL}
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={image_url}
				/>
				<RichText
					tagName="h2"
					allowFormats={[]}
					value={title}
					placeholder={__('Your Title', 'myblocks')}
					onChange={(val) => setAttributes({ title: val })}
				/>
				<RichText
					tagName="p"
					allowFormats={[]}
					value={description}
					placeholder={__('Your Description', 'myblocks')}
					onChange={(val) => setAttributes({ description: val })}
				/>
			</div>
		</>
	);
}
