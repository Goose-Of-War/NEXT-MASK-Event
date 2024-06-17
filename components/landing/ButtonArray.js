import Link from 'next/link';

import styles from '@/styles/Landing.module.css';

export default function ButtonArray () {
	return (
		<div id={styles['button-container']}>
			<Link href="/instructions"> Instructions </Link>
			<Link href="/live"> Quiz Portal </Link>
			<Link href="https://kgpmask.club"> Main Website </Link>
			<Link href="/"> Contact Us </Link>
		</div>
	);
}
