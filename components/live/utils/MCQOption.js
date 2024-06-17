import styles from '@/styles/Quiz.module.css';

export default function MCQOption ({ option, value, selected, onClick }) {
	return (
		<div className={
			selected ? styles['mcq-option'] + ' ' + styles['selected'] : styles['mcq-option']
			} onClick={onClick}>
			<div className={styles["option"]} onClick={onClick}> { option } </div>
			<div className={styles["value"]} onClick={onClick}> { value } </div>
		</div>
	);
}
