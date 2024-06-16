import styles from '@/styles/Navbar.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Navbar () {
	return (
		<nav>
			<div className={styles['logo']}>
				<img src="logo.webp" />
				<p className={inter.className}>
					Manga and Anime <br />
					Society Kharagpur
				</p>
			</div>
			<div className={styles['logo']}>
				<button children={'Register'} id={styles['register']} />
			</div>
		</nav>
	);
}
