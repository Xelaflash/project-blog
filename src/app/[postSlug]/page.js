import { Suspense } from 'react';

import BlogHero from '@/components/BlogHero';
import Spinner from '@/components/Spinner/Spinner';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';

async function BlogPost({ params }) {
	console.log(params);

	const post = await loadBlogPost(params.postSlug);
	console.log(post);

	return (
		<article className={styles.wrapper}>
			<Suspense fallback={<Spinner />}>
        <BlogHero title={post.frontmatter.title } publishedOn={post.frontmatter.publishedOn} />
			<div className={styles.page}>
				<MDXRemote
					source={post.content}
				/>
			</div>
			</Suspense>
		</article>
	);
}

export default BlogPost;
