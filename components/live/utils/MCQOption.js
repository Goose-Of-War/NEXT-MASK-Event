import styles from '@/styles/Quiz.module.css';

export default function MCQOption ({ option, value, effect }) {
	return (
		<button className={styles['mcq-option']}>
			<div className={styles["option"]}> { option } </div>
			<div className={styles["value"]}> { value } </div>
		</button>
	);
}
