import RSS from 'rss';

import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

export async function GET() {
	const feed = new RSS({
		title: BLOG_TITLE,
		description: BLOG_DESCRIPTION,
	});

	const getPosts = await getBlogPostList();

	getPosts.forEach((post) => {
		feed.item({
			title: post.title,
			description: post.abstract,
			url: `http://localhost:3000/${post.slug}`,
			date: post.publishedOn,
		});
	});
	// Generate the raw XML string using `feed.xml`, and then
	// send it to the client. We need to set the Content-Type
	// header so that browsers / RSS clients will interpret
	// it as XML, and not as plaintext.
	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}
