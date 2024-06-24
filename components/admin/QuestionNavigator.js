import { useState } from "react";

import styles from '@/styles/Admin.module.css';

const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

export default function QuestionNavigator ({ questions, startQuestion }) {
	const [currentQ, setCurrentQ] = useState(0);

	return (
		<>
			<div id={styles['question-navigator']}>
				<button className={styles['navigators']} onClick={() => setCurrentQ(max(0, currentQ - 1))}> {`<`} </button>
				<div id={styles['question-card']}>
					<p>
						<span>Q No:</span> { questions[currentQ].questionNo } <br />
						<span>Title:</span> { questions[currentQ].title } <br />
						<span>Question:</span> { questions[currentQ].question } <br />
						<span>Type:</span> { questions[currentQ].type } <br />
						{ questions[currentQ].options && <> <span>Options:</span> { questions[currentQ].options.join(', ') } <br /> </> }
					</p>
				</div>
				<button className={styles['navigators']} onClick={() => setCurrentQ(min(questions.length - 1, currentQ + 1))}> {`>`} </button>
			</div>
			<button className="light" onClick={() => startQuestion(questions[currentQ])}> Start </button>
		</>
	)
}
