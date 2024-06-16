import ButtonArray from "./ButtonArray";
import Description from "./Description";

import styles from '@/styles/Landing.module.css';

export default function MainContent () {
	return (
		<div id={styles["main-content"]}>
			<Description />
			<ButtonArray />
		</div>
	);
}
