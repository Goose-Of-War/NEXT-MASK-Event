import Head from "next/head";

import Layout from "@/components/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title> MASK </title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}
