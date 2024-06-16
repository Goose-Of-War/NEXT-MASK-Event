import { useContext, useEffect, useState } from "react";
import Head from "next/head";

import Countdown from "@/components/landing/Countdown";
import MainContent from "@/components/landing/MainContent";

export default function Home() {
	const [timeLeft, setTimeLeft] = useState(521622);

	useEffect(() => {
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
