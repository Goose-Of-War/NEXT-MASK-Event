import Head from 'next/head';
import { useMemo, useState } from 'react';

import EarlyLateMessage from '@/components/live/EarlyLateMessage';
import LiveInstructions from '@/components/live/LiveInstructions';
import MessageCard from '@/components/live/utils/MessageCard';
import SubmittedMessage from '@/components/live/SubmittedMessage';
import WaitingMessage from '@/components/live/WaitingMessage';
import TimeoutMessage from '@/components/live/TimeoutMessage';
import Question from '@/components/live/Question';

const LivePageHead = () => (
	<Head>
		<title> Live Quiz Portal </title>
		<meta name='description' content='Starting off with the quiz, here we go!!!' />
	</Head>
)

export default function LivePage () {
	const [currentState, setCurrentState] = useState('instructions');
	// Current States: early, instructions, waiting, attempting, timeout, submitted, late
	const [renderComponent, setRenderComponent] = useState(<LiveInstructions />);
	const [timeleft, setTimeleft] = useState(0);
	const [answer, setAnswer] = useState(null);
	const [question, setQuestion] = useState(null);
	const [compTimeout, setCompTimeout] = useState(null);

	const startQuestion = () => {
		if (currentState !== 'waiting') return;
		setQuestion({
			no: 44,
			title: 'Odd One Out: 4',
			type: 'text',
			options: 'Naruto Luffy Goku Ichigo'.split(' ')
		});
		setTimeleft(20);
		setCurrentState('attempting');
	}

	const submitAnswer = (arg) => {
		setAnswer(undefined);
		setTimeleft(0);
		setQuestion(null);
		setCurrentState(arg?.timeout ? 'timeout' : 'submitted');
	};

	useMemo(() => {
		if (timeleft) {
			const timeout = setTimeout(() => setTimeleft(timeleft - 1), 1_000);
			return () => clearTimeout(timeout);
		}
		if (currentState === 'attempting') {
			submitAnswer({timeout: true});
		}
	}, [timeleft])

	useMemo(() => {
		switch (currentState) {
			case 'early':
				setRenderComponent(
					<EarlyLateMessage />
				)
				break;
			case 'instructions':
				setRenderComponent(
					<LiveInstructions buttonCallback={() => setCurrentState('waiting')} />
				);
				break;
			case 'waiting':
				setRenderComponent(
					<WaitingMessage />
				);
				break;
			case 'attempting':
				setRenderComponent(
					<Question 
						question={question}
						timeLeft={timeleft}
						updateAnswer={value => setAnswer(value)}
						submitAnswer={submitAnswer}
					/>
				);
				break;
			case 'timeout':
				setRenderComponent(
					<TimeoutMessage />
				)
				setCompTimeout(setTimeout(() => setCurrentState('waiting'), 3_000));
				break;
			case 'submitted':
				clearTimeout(compTimeout);
				setRenderComponent(
					<SubmittedMessage />
				);
				setCompTimeout(setTimeout(() => setCurrentState('waiting'), 3_000));
				break;
			case 'late':
				setRenderComponent(
					<EarlyLateMessage late={true} />
				)
				break;
			default:
				setRenderComponent(
					<MessageCard message={'Polayadi Mone'} />
				);
		}
	}, [currentState]);

	return (
		<>
			<LivePageHead />
			<button onClick={startQuestion}> Question Time </button>
			{ renderComponent }
		</>
	);

}
