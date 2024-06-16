import styles from '@/styles/Landing.module.css';

export default function Description () {
	return (<div id={styles['description']}>
		<p style={{ color: 'var(--red)', fontSize: '35px', textAlign: 'center', margin: '0px' }}> Open Campus Anime Quiz </p>

		<p>Are you a diehard anime fan, who has watched a ton of anime? Or are you just a casual watcher who occasionally watches to pass some time? Either way, we just have one question for you. How well do you know your anime?</p>

		<p>Welcome to the third Open Campus Anime Quiz. With a curated set of questions over many popular anime, this quiz will be something you do not want to miss. From simple trivia about your favourite characters to a musical showcase, we have it all just for you. And what fun would a quiz be without some prizes for the winners? (it is not just the experiences you made along the way)</p>

		<p>What are you waiting for? Hurry up and register!!! It’s free for all, but only limited seats are there.</p>
	</div>);
}
