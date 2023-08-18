'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants';
import Link from 'next/link';

function Header({ initialTheme, className, ...delegated }) {
	const [theme, setTheme] = React.useState(initialTheme);

	const handleToggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
		Cookies.set('color-theme', nextTheme, {
			expires: 1000,
		});

		const root = document.documentElement;
		const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

		root.setAttribute('data-color-theme', nextTheme);
		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	};

	return (
		<header className={clsx(styles.wrapper, className)} {...delegated}>
			<Logo />

			<div className={styles.actions}>
				<Link href="/rss.xml" className={styles.action}>
					<Rss
						size="1.5rem"
						style={{
							// Optical alignment
							transform: 'translate(2px, -2px)',
						}}
					/>
					<VisuallyHidden>View RSS feed</VisuallyHidden>
				</Link>
				<button className={styles.action} onClick={handleToggleTheme}>
					{theme === 'light' ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
					<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
				</button>
			</div>
		</header>
	);
}

export default Header;
