import { useMemo, useState } from "react";

import MessageCard from "./utils/MessageCard";

export default function WaitingMessage () {
	const [dots, setDots] = useState(1);

	useMemo(() => {
		setTimeout(() => setDots(dots % 3 + 1), 1_000);
	}, [dots]);

	return (
		<MessageCard>
			Waiting for the quizmaster{ Array(dots).fill('.').join('') }
		</MessageCard>
	);
}
