import styles from '@/styles/Landing.module.css';

export default function ButtonArray () {
	return (
		<div id={styles['button-container']}>
			<a href="/instructions"> Instructions </a>
			<a href="/live"> Quiz Portal </a>
			<a href="https://kgpmask.club"> Main Website </a>
			<a href="/"> Contact Us </a>
		</div>
	);
}
