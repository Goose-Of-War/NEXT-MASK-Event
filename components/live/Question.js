import { useMemo, useState } from "react";
import MessageCard from "./utils/MessageCard";

import styles from '@/styles/Quiz.module.css';
import MCQOption from "./utils/MCQOption";

export default function Question ({ question, timeLeft, updateAnswer, submitAnswer }) {
	const [time, setTime] = useState(timeLeft);

	useMemo(() => setTimeout(() => setTime((time || 1) - 1), 1_000), [time]);

	return (
		<div className={styles['question-card']}>
			<div className={styles['information']}>
				<p>
					<span style={ {color: 'var(--red)'} }> Question No: { question?.no || 'null' } </span> <br/>
					<span style={ {fontSize: '20px'} } > { question.title } </span>
				</p>
				<p className={styles["timer"]}> { time.toLocaleString('en-us', { minimumIntegerDigits: 2 } ) } </p>
			</div>
			<div className={styles['attempt-field']}>
				{
					question.type === 'mcq' ?
					question.options.map((val, ind) => <MCQOption option={'ABCD'[ind]} value={val} effect={() => updateAnswer(ind + 1)} />)
					: ''
				}
			</div>
			<div></div>
		</div>
	);
	
	// return <MessageCard message={'Work in progress'} />;
}
