'use client';
import React from 'react';

import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
	{ label: 'red', value: 'hsl(348deg 100% 60%)' },
	{ label: 'yellow', value: 'hsl(50deg 100% 55%)' },
	{ label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
	const id = React.useId();
	const [timeElapsed, setTimeElapsed] = React.useState(0);
	const [status, setStatus] = React.useState('idle');

	React.useEffect(() => {
		if (status !== 'playing') {
			return;
		}

		const intervalId = window.setInterval(() => {
			setTimeElapsed((currentValue) => currentValue + 1);
		}, 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [status]);

	const playHandler = () => {
		setStatus('playing');
	};

	const pauseHandler = () => {
		setStatus('idle');
	};

	const resetHandler = () => {
		setStatus('idle');
		setTimeElapsed(0);
	};

	// The selectedColor should be calculated using the timeElapsed. It's shown as a black rectangle around 1 of the colors, and it should cycle through the 3 colors
	const selectedColor = COLORS[timeElapsed % COLORS.length];

	return (
		<Card as="section" className={styles.wrapper}>
			<ul className={styles.colorsWrapper}>
				{COLORS.map((color, index) => {
					const isSelected = color.value === selectedColor.value;

					return (
						<li className={styles.color} key={index}>
							{isSelected && <motion.div className={styles.selectedColorOutline} layoutId={`${id}-color`} />}
							<div
								className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
								style={{
									backgroundColor: color.value,
								}}
							>
								<VisuallyHidden>{color.label}</VisuallyHidden>
							</div>
						</li>
					);
				})}
			</ul>

			<div className={styles.timeWrapper}>
				<dl className={styles.timeDisplay}>
					<dt>Time Elapsed</dt>
					<dd>{timeElapsed}</dd>
				</dl>
				<div className={styles.actions}>
					{status === 'playing' ? (
						<button onClick={pauseHandler}>
							<Pause />
							<VisuallyHidden>Pause</VisuallyHidden>
						</button>
					) : (
						<button onClick={playHandler}>
							<Play />
							<VisuallyHidden>Play</VisuallyHidden>
						</button>
					)}

					<button onClick={resetHandler}>
						<RotateCcw />
						<VisuallyHidden>Reset</VisuallyHidden>
					</button>
				</div>
			</div>
		</Card>
	);
}

export default CircularColorsDemo;
