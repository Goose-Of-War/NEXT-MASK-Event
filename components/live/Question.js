import { useMemo, useState } from "react";
import MessageCard from "./utils/MessageCard";

import styles from '@/styles/Quiz.module.css';
import OptionField from "./utils/OptionField";
import InputField from "./InputField";

export default function Question ({ question, timeLeft, updateAnswer, submitAnswer }) {
	const [time, setTime] = useState(timeLeft);

	useMemo(() => setTimeout(() => setTime((time || 1) - 1), 1_000), [time]);

	return (
		<div className={styles['question-card']}>
			<div className={styles['information']}>
				<p>
					<span style={ {color: 'var(--red)'} }> Question No: { question.questionNo || 'null' } </span> <br/>
					<span style={ {fontSize: '20px'} } > { question.title } </span> <br />
					{ question.question }
				</p>
				<p className={styles["timer"]}> { time.toLocaleString('en-us', { minimumIntegerDigits: 2 } ) } </p>
			</div>
			<div className={styles['attempt-field']}>
				{
					question.type === 'mcq' ?
					<OptionField options={question.options} updateFunction={option => updateAnswer(option)} />
					: <InputField updateFunction={value => updateAnswer(value)} submitFunction={submitAnswer} />
				}
			</div>
			<div className={styles['submit-field']}>
				<button className="light" onClick={submitAnswer}> Submit </button>
			</div>
		</div>
	);
	
	// return <MessageCard message={'Work in progress'} />;
}
