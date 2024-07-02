import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthForm from "@/components/AuthForm";
import MessageCard from "@/components/live/utils/MessageCard";

export default function LogoutPage() {
	const [loggedIn, setLoggedIn] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const username = localStorage.getItem('username');
		if (!username) setLoggedIn(false);
	});

	async function logout () {
		try {
			const response = await fetch('/api/logout', { method: 'POST' });
			if (response.status >= 400) throw (await response.text());
			console.log(await response.text());
			localStorage.removeItem('username');
			localStorage.removeItem('name');
			localStorage.removeItem('is-admin');
			alert('Successfully logged out');
			router.push('/');
		} catch (err) {
			console.log(err);
			return alert('Something went wrong.');
		}
	}

	if (!loggedIn) return <MessageCard message={<>
	You might want to <Link href='/login'>login</Link> first. </>} />

	return (<AuthForm>
		<p style={{ textAlign: 'center' }}>Click here to <Link href={'/'}>go back</Link>. If you really want to, click the button to logout</p>

		<button className="light" onClick={logout}> Logout </button>
	</AuthForm>)
}
