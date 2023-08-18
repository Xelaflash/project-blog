import Link from 'next/link';
import { BLOG_TITLE } from '@/constants';

import styles from './not-found.module.css';
import clsx from 'clsx';

export const metadata = {
	title: `404 Not found • ${BLOG_TITLE}`,
};

export default function NotFound() {
	return (
		<div className={clsx(styles.wrapper)}>
			<h1 className={clsx(styles.title)}>🫣 404 Not Found</h1>
			<p>Page does not exist. PLease review url and give it another try</p>
			<Link className={clsx(styles.link)} href="/">
				Return Home
			</Link>
		</div>
	);
}
