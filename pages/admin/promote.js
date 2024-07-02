import AuthForm from "@/components/AuthForm";
import InputField from "@/components/AuthForm/InputField";
import { useState } from "react";

export default function AdminPromotePage () {
	const [username, setUsername] = useState('');
	const [secret, setSecret] = useState('');

	async function promote () {
		try {
			if (!username || !secret) throw 'At least fill the credentials properly...';
			const response = await fetch('/api/admin-promote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, secret })
			});
			if (response.status >= 400) throw (await response.text());
			alert(`Successfully promoted to admin.`);
			router.push('/');
		} catch (err) {
			console.log(err);
			return alert('Something went wrong');
		}
	}

	return (
		<AuthForm heading={'Promote to Admin'}>
			<InputField name={'username'} updateFunction={val => setUsername(val)} />
			<InputField name={'secret'} type={'password'} updateFunction={val => setSecret(val)} />
			<button className="light" onClick={promote}> Promote </button>
		</AuthForm>
	)
}
