import styles from '@/styles/Landing.module.css';

export default function Countdown ({ timeLeft, tick }) {
	return (
		<div id={styles['countdown-card']}>
			<p id={styles['countdown']}>{
				Math.floor(timeLeft / 86400)
				}:{
				Math.floor((timeLeft % 86400) / 3600).toLocaleString('en-us', { minimumIntegerDigits: 2 })
				}:{
				Math.floor((timeLeft % 3600) / 60).toLocaleString('en-us', { minimumIntegerDigits: 2 })
				}:{
				(timeLeft % 60).toLocaleString('en-us', { minimumIntegerDigits: 2 })
				}
			</p>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<img src="location-icon.svg" /> &nbsp; V1, Vikramshila
			</div>
		</div>
	);
}
