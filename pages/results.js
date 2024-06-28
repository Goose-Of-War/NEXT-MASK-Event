import { useMemo, useState } from "react";

import MessageCard from "@/components/live/utils/MessageCard";

import styles from '@/styles/Results.module.css';
import ResultsTable from "@/components/results/ResultsTable";

export default function ResultsPage () {
	const [results, setResults] = useState(null);

	const fetchResults = async () => {
		try {
			const response = await fetch ('/api/live/results');
			if (response.status >= 400) throw await response.text();
			const res = await response.json();
			console.log(res);
			setResults(res.sort((a, b) => -(a.points > b.points)));
		} catch (err) {
			console.error(err);
		}
	}

	useMemo(() => {
		if (!results) fetchResults();
	}, [results]);

	if (!results) return <MessageCard message={'Results are yet to be evaluated. Try again later.'} />;

	return (
		<div id={styles['main']}>
			<p style={{ color: 'var(--red)', fontSize: '35px', textAlign: 'center', margin: '0px' }}> Results </p>
			<div id={styles["results"]}>
				<ResultsTable results={results} />
			</div>
		</div>
	)
}
