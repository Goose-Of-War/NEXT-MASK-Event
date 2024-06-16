import styles from '@/styles/Quiz.module.css';

export default function MessageCard ({ message, children }) {
	return (
		<>
			<div className={styles['message-card']}>
				{ message || children }
			</div>
		</>
	);
}
