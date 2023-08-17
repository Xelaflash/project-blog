import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';


async function Home() {

	const articles = await getBlogPostList();

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.mainHeading}>
				Latest Content:
			</h1>

			{articles.map((article) => {
				return (
					<BlogSummaryCard
						key={article.slug}
						slug={article.slug}
						title={article.title}
						abstract={article.abstract}
						publishedOn={article.publishedOn}
					/>
				)
			})}
		</div>
	);
}

export default Home;
