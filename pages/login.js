import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthForm from "@/components/AuthForm";
import InputField from "@/components/AuthForm/InputField";
import MessageCard from "@/components/live/utils/MessageCard";

export default function LoginPage () {
	const [loggedIn, setLoggedIn] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	useEffect(() => {
		const username = localStorage.getItem('username');
		if (username) setLoggedIn(true);
	});

	async function login () {
		try {
			if (!username || !password) throw 'At least fill the credentials properly...';
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			if (response.status >= 400) throw (await response.text());
			const userData = await response.json();
			localStorage.setItem('username', userData.username);
			localStorage.setItem('name', userData.name);
			alert(`Successfully logged in as ${userData.name}`);
			router.push('/');
		} catch (err) {
			console.log(err);
			return alert('Something went wrong');
		}
	}

	if (loggedIn) return <MessageCard message={<>You are already logged in. <Link href={'/'}>Go back</Link></>} />;

	return (
		<AuthForm heading={ 'Login' }>
			<InputField name={'username'} updateFunction={val => setUsername(val)} />
			<InputField name={'password'} type={'password'} updateFunction={val => setPassword(val)} />
			<p> Haven&apos;t made an account? <Link href={'/register'}> Create one </Link> </p>
			<button className="light" onClick={login}> Login </button>
		</AuthForm>
	)
}
