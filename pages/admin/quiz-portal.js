import { useEffect, useMemo, useState } from "react";

import ForbiddenCard from "@/components/admin/ForbiddenCard";
import AdminContent from "@/components/admin/AdminContent";
import QuestionNavigator from "@/components/admin/QuestionNavigator";

import socket from "@/socket";

export default function QuizPortalPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	// Socket Connection state
	const [socketConnected, setSocketConnected] = useState(false);
	const [socketTransport, setSocketTransport] = useState("N/A");

	const [questions, setQuestions] = useState(null);

	useEffect(() => {
		setHasChecked(localStorage.getItem('is-admin'));
		setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
	});

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

		return (
			() => {
				socket.off('connect', onSocketConnect);
				socket.off('disconnect', onSocketDisconnect);
			}
		)
	}, []);

	useMemo(async () => {
		if (!hasChecked) {
			if (!localStorage.getItem('username')) return setIsAdmin(false);
			try {
				const response = eval(await (await fetch('/api/check-admin')).text());
				localStorage.setItem('is-admin', response);
				setIsAdmin(response);
			} catch (err) {
				console.log(err);
			}
		} else {
			setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
		}
	}, [hasChecked]);

	useMemo(async () => {
		try {
			if (questions) return;
			if (!localStorage.getItem('questions')){
				const response = await fetch('/api/live/fetch-questions');
				if (response.status !== 201) throw await response.text();
				localStorage.setItem('questions', await response.text());
			}
			return setQuestions(JSON.parse(localStorage.getItem('questions')));
		} catch (err) {
			console.log(err);
			alert('Something went wrong.');
		}
	}, [questions])

	if (!isAdmin) return <ForbiddenCard />;

	const startQuestion = async question => {
		const response = await fetch('/api/live/start-question', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ questionNo: question.questionNo, type: question.type })
		});
		console.log(await response.text());
		if (response.status < 400) socket.emit('question', question);
	}

	return (
		<AdminContent title={'Quiz Portal'}>
			<center>Quiz in progress: <span style={{ color: 'var(--red)' }}>7357</span></center>
			{
				questions ? 
				<QuestionNavigator questions={questions} startQuestion={startQuestion} /> :
				'Fetching questions...'
			}
		</AdminContent>
	);
}
