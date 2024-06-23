import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import styles from '@/styles/Navbar.module.css';

export default function Navbar () {
	const [userName, setUserName] = useState('');
	const router = useRouter();

	useEffect(() => {
		const un = localStorage.getItem('username');
		if (!un) setUserName('');
		else setUserName(localStorage.getItem('name') || 'User');
	});

	return (
		<nav>
			<Link href='/' className={styles['logo']}>
				<img src="/logo.webp" />
				<p>
					Open Campus <br />
					Anime Quiz
				</p>
			</Link>
			<div className={styles['logo']}>
				{
					userName
					? <button id={styles['register']} onClick={() => router.push('/profile')} style={{
						display: 'flex', flexDirection: 'row', alignItems: 'center'
					}}> 
						<FaUserCircle size={28}/> <p style={{ display: 'inline', margin: 0,  marginLeft: '5px' }}>Profile</p>
					</button>
					: <button id={styles['register']} onClick={() => router.push('/register')}>
						Register
					</button>
				}
			</div>
		</nav>
	);
}
