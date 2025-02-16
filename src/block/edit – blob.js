import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components'; // для завантаження картинки
import { isBlobURL } from '@wordpress/blob';
// MediaPlaceholder для завантаження медіа, але не для виводу
export default function Edit({ attributes, setAttributes }) {
	const { title, description, image_id, image_url, image_alt } = attributes;

	return (
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
				onSelect={(val) =>
					setAttributes({
						image_id: val.id,
						image_url: val.url,
						image_alt: val.alt,
					})
				}
				// for insert url
				onSelectURL={(val) =>
					setAttributes({
						image_id: undefined,
						image_url: val,
						image_alt: '',
					})
				}
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
	);
}
