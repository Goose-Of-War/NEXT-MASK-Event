import Head from 'next/head';

import styles from '@/styles/Auth.module.css';

export default function AuthForm ({ heading, children }) {
	return (
		<div id={styles['auth']}>
			<Head>
				<title>{ heading }</title>
			</Head>
			<p style={{ color: 'var(--red)', fontSize: '35px', textAlign: 'center', margin: '10px' }}>
				{ heading }
			</p>
			{ children }
		</div>
	)
}
