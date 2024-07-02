import styles from '@/styles/Admin.module.css';

export default function AdminContent ({ title, children }) {
	return (
		<div id={styles['admin']}>
			{title && (<p style={{ color: 'var(--red)', fontSize: '35px', textAlign: 'center', margin: '10px' }}> {title} </p>)}
			{ children }
		</div>
	)
}
