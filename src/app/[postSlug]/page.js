import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';
import Spinner from '@/components/Spinner/Spinner';
import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'));
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'));

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE } from '@/constants';

export async function generateMetadata({ params }) {
	const postData = await loadBlogPost(params.postSlug);

	if (!postData) {
		return notFound();
	}

	const { frontmatter } = postData;

	return {
		title: `${frontmatter.title} • ${BLOG_TITLE}`,
		description: frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const postData = await loadBlogPost(params.postSlug);

	if (!postData) {
		return notFound();
	}

	const { frontmatter, content } = postData;

	return (
		<article className={styles.wrapper}>
			<Suspense fallback={<Spinner />}>
				<BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
				<div className={styles.page}>
					<MDXRemote
						source={content}
						components={{
							pre: CodeSnippet,
							DivisionGroupsDemo,
							CircularColorsDemo,
						}}
					/>
				</div>
			</Suspense>
		</article>
	);
}

export default BlogPost;
