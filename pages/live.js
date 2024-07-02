import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import EarlyLateMessage from '@/components/live/EarlyLateMessage';
import LiveInstructions from '@/components/live/LiveInstructions';
import MessageCard from '@/components/live/utils/MessageCard';
import SubmittedMessage from '@/components/live/SubmittedMessage';
import WaitingMessage from '@/components/live/WaitingMessage';
import TimeoutMessage from '@/components/live/TimeoutMessage';
import Question from '@/components/live/Question';

import socket from '@/socket';

const LivePageHead = () => (
	<Head>
		<title> Live Quiz Portal </title>
		<meta name='description' content='Starting off with the quiz, here we go!!!' />
	</Head>
)

export default function LivePage () {
	// Socket Connection state
	const [socketConnected, setSocketConnected] = useState(false);
	const [socketTransport, setSocketTransport] = useState("N/A");
	// Current States: early, instructions, waiting, attempting, timeout, submitted, late
	const [currentState, setCurrentState] = useState('instructions');
	// Render Component based on current state
	const [renderComponent, setRenderComponent] = useState(<LiveInstructions />);
	// Time Left (mainly for quiz)
	const [timeleft, setTimeleft] = useState(0);
	// Solution set by user
	const answer = useRef(null);
	// Question fetched from socket
	const [question, setQuestion] = useState(null);
	// Component timeout (for message cards)
	const [compTimeout, setCompTimeout] = useState(null);

	const router = useRouter();

	const startQuestion = (qn) => {
		if (currentState !== 'waiting') return;
		const type = qn.type;
		setQuestion(qn);
		answer.current = null;
		setTimeleft(type === 'mcq' ? 10 : 20);
		setCurrentState('attempting');
	}

	const submitAnswer = useCallback((arg) => {
		const questionNo = question.questionNo;
		const response = answer.current;
		console.log({questionNo, response});
		fetch('/api/live/save-response', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ questionNo, response })
		}).then(res => res.text()).then(res => {
			console.log(res)
			// setAnswer(undefined);
			setTimeleft(0);
			setQuestion(null);
			setCurrentState(arg?.timeout ? 'timeout' : 'submitted');
		});
	});

	const timeoutSubmit = useCallback(() => {
		if (currentState !== 'attempting') return;
		submitAnswer({ timeout: true });
	})

	useEffect(() => {
		// Needs to be logged in
		if (!localStorage.getItem('username')) router.push('/login');

		const onSocketConnect = () => {
			setSocketConnected(true);
			setSocketTransport(socket.io.engine.transport.name);
		}

		const onSocketDisconnect = () => {
			setSocketConnected(false);
			setSocketTransport("N/A");
		}

		if (socket.connected) onSocketConnect();

		socket.on('connect', onSocketConnect);
		socket.on('disconnect', onSocketDisconnect);
		socket.on('timeout', timeoutSubmit);
		socket.on('start-quiz', () => setCurrentState('instructions'));
		socket.on('end-quiz', () => router.push('/results'));

		return (
			() => {
				socket.off('connect', onSocketConnect);
				socket.off('disconnect', onSocketDisconnect);
			}
		)
	}, []);

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
				socket.on('question', question => startQuestion(question));
				setRenderComponent(
					<WaitingMessage />
				);
				break;
			case 'attempting':
				setRenderComponent(
					<Question 
						question={question}
						timeLeft={timeleft}
						updateAnswer={value => answer.current = value}
						submitAnswer={submitAnswer}
					/>
				);
				break;
			case 'timeout':
				socket.listeners('question').splice(0, socket.listeners('question').length);
				setRenderComponent(
					<TimeoutMessage />
				)
				setCompTimeout(setTimeout(() => setCurrentState('waiting'), 3_000));
				break;
			case 'submitted':
				socket.listeners('question').splice(0, socket.listeners('question').length);
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
			{/* <button onClick={startQuestion}> Question Time </button> */}
			{ renderComponent }
		</>
	);

}
