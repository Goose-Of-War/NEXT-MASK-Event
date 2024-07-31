import { useMemo, useState } from "react";
import Head from "next/head";

import Countdown from "@/components/landing/Countdown";
import MainContent from "@/components/landing/MainContent";

export default function Home() {
	const [timeLeft, setTimeLeft] = useState(
		Math.floor((Number(new Date('2024-08-18T14:30:00.000+05:30')) - Date.now()) / 1000)
	);

	useMemo(() => {
		setTimeout(() => setTimeLeft(timeLeft - 1), 1_000);
	}, [timeLeft]);

	return (
		<>
			<Head>
				<title> Open Campus Anime Quiz 2024 </title>
			</Head>
			<Countdown timeLeft={timeLeft} />
			<MainContent />
		</>
	);
}
