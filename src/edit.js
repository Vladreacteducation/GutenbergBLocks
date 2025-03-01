import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

// це хук у WordPress, який використовується для отримання даних із wp.data у React-компонентах, коли працюєш із редактором блоків (Gutenberg).

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { postsPerPage, showImage, order, orderBy, category } = attributes;
	const posts = useSelect(
		(select) => {
			return wp.data.select('core').getEntityRecords('postType', 'post', {
				per_page: postsPerPage,
				_embed: true,
				//  для сортування ці дві змінни order і orderBy
				order,
				orderBy: orderBy,
				categories: category ? category: [] 
			});
		},
		// щоб оновлялося значення в кінці дописується
		[postsPerPage, order, orderBy, category]
	);
	// console.log( posts );

//  для категорій
	const categories = useSelect(
		(select) => {
			return wp.data.select('core').getEntityRecords('taxonomy', 'category', {
				per_page: -1,
			
			});
		},
		// для категорій не потрібно
		[]
	);



	const blockProps = useBlockProps();

	const onChangeToogleImage = (value) => {
		setAttributes({ showImage: value });
	};

	const onChangePostPerPage = (value) => {
		setAttributes({ postsPerPage: value });
	};

	const onChangeOrder = (value) => {
		setAttributes({ order: value });
	};

	const onChangeOrderBy = (value) => {
		setAttributes({ orderBy: value });
	};

	const onChangeCategory = (value) =>{
		setAttributes({category:value})
	}

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label="Display Images"
						checked={showImage}
						onChange={onChangeToogleImage}
					/>
					{/*  <QueryControls /> — це компонент із бібліотеки Gutenberg, який дозволяє створювати інтерфейс для налаштувань запиту постів або інших типів контенту в блоках. 
У цьому випадку ви використовуєте його для налаштування кількості елементів, які повинні бути виведені (наприклад, кількості постів). */}
					<QueryControls
						numberOfItems={postsPerPage}
						onNumberOfItemsChange={onChangePostPerPage}
						maxItems={6}
						minItems={1}
						order={order}
						onOrderChange={onChangeOrder}
						orderBy={orderBy}
						onOrderByChange={onChangeOrderBy}
						categoriesList={categories}
						selectedCategoryId={category}
						onCategoryChange={onChangeCategory}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{posts &&
					posts.map((post) => {
						const featuredImage =
							post._embedded &&
							post._embedded['wp:featuredmedia'] &&
							post._embedded['wp:featuredmedia'].length > 0 &&
							post._embedded['wp:featuredmedia'][0];

						return (
							<div key={post.id}>
								{showImage && (
									<img
										src={featuredImage.source_url}
										alt={featuredImage.alt_text}
									/>
								)}
								{post.date_gmt && (
									<time dateTime={format('c', post.date_gmt)}>
										{dateI18n(
											getSettings().formats.date,
											post.date_gmt
										)}
									</time>
								)}
								<h2>
									<a href={post.link}>
										{post.title.rendered}
									</a>
								</h2>
							</div>
						);
					})}
			</div>
		</>
	);
}
