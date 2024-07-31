import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import AuthForm from "@/components/AuthForm";
import InputField from "@/components/AuthForm/InputField";
import MessageCard from "@/components/live/utils/MessageCard";

export default function RegisterPage () {
	const [loggedIn, setLoggedIn] = useState(null);
	const [name, setName] = useState('')
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	useEffect(() => {
		const username = localStorage.getItem('username');
		if (username) setLoggedIn(true);
	});

	async function register () {
		try {
			if (!username || !password || !name) return alert('At least fill the credentials properly...');
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, username, password })
			});
			if (response.status >= 400) throw (await response.text());
			const userData = await response.json();
			localStorage.setItem('username', userData.username);
			localStorage.setItem('name', userData.name);
			alert(`Successfully registered in as ${userData.name}`);
			router.push('/');
		} catch (err) {
			console.log(err);
			return alert('Something went wrong');
		}
	}

	useEffect(() => {
		const information = localStorage.getItem('username');
		if (information) {
			setLoggedIn(true);
		}
	});

	if (loggedIn) return <MessageCard message={<>You are already logged in. <Link href={'/'}>Go back</Link></>} />;

	return (
		<AuthForm heading={ 'Register' }>
			<InputField name={'name'} updateFunction={val => setName(val)} />
			<InputField name={'username'} updateFunction={val => setUsername(val)} />
			<InputField name={'password'} type={'password'} updateFunction={val => setPassword(val)} />
			<p> Already have an account? <Link href={'login'}> Login</Link> now </p>
			<button className="light" onClick={register}> Register </button>
		</AuthForm>
	)
}
