import { useState } from "react";

import styles from '@/styles/Quiz.module.css';

export default function InputField ({ updateFunction, submitFunction }) {
	const [value, setValue] = useState('');

	const handleChange = event => {
		const readValue = event.target.value.trim();
		setValue(readValue);
		updateFunction(readValue);
	}

	const checkEnter = event => {
		if (event.key === 'Enter') submitFunction();
		return;
	}

	return (
		<input 
			type="text"
			className={styles['input-field']}
			placeholder="Enter your answer"
			onChange={handleChange}
			onKeyDown={checkEnter}
		/>
	);
}
