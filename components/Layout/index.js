import { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from "./Navbar";

export default function Layout ({ children }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<>
			<Navbar />
			<div id="main">
				<div style={{ display: loaded ? 'block' : 'none' }}>{ children }</div>
			</div>
			<Footer />
		</>
	);
}
