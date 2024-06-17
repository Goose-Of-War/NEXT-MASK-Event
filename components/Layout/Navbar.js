import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from '@/styles/Navbar.module.css';

export default function Navbar () {
	return (
		<nav>
			<Link href='/' className={styles['logo']}>
				<img src="logo.webp" />
				<p>
					Open Campus <br />
					Anime Quiz
				</p>
			</Link>
			<div className={styles['logo']}>
				<button children={'Register'} id={styles['register']} />
			</div>
		</nav>
	);
}
