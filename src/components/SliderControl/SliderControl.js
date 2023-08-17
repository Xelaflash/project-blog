import React from 'react';

import Slider from '@/components/Slider';
import styles from './SliderControl.module.css';

function SliderControl({ id, label, value, ...delegated }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
				<span className={styles.value}>{value}</span>
			</div>
			<Slider {...delegated} value={value} id={id} />
		</div>
	);
}

export default SliderControl;
