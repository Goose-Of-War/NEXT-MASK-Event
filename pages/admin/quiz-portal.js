import { useEffect, useMemo, useState } from "react";

import ForbiddenCard from "@/components/admin/ForbiddenCard";
import AdminContent from "@/components/admin/AdminContent";
import QuestionNavigator from "@/components/admin/QuestionNavigator";



export default function QuizPortalPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const [questions, setQuestions] = useState(null);

	useEffect(() => {
		setHasChecked(localStorage.getItem('is-admin'));
		setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
	});

	useMemo(async () => {
		if (!hasChecked) {
			if (!localStorage.getItem('username')) return setIsAdmin(false);
			const response = eval(await (await fetch('/api/check-admin')).text());
			localStorage.setItem('is-admin', response);
			setIsAdmin(response);
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

	return (
		<AdminContent title={'Quiz Portal'}>
			<center>Quiz in progress: <span style={{ color: 'var(--red);' }}>7357</span></center>
			{
				questions ? 
				<QuestionNavigator questions={questions} /> :
				'Fetching questions...'
			}
		</AdminContent>
	);
}
