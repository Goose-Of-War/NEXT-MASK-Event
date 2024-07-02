import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import MessageCard from "@/components/live/utils/MessageCard";

import styles from '@/styles/Profile.module.css';
import EditProfilePictureModal from "@/components/profile/EditProfilePictureModal";

export default function ProfilePage () {
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [editName, setEditName] = useState(false);
	const [bufferName, setBufferName] = useState('');
	const [profilePic, setProfilePic] = useState('');

	const router = useRouter();

	async function submitFunction (ctx) {
		try {
			const response = await fetch('/api/update-profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username, name, profilePic, ...ctx
				})
			});
			if (response.status >= 400) throw (await response.text());
			console.log(await response.text());
			if (ctx.profilePic !== undefined) setProfilePic(ctx.profilePic);
			if (ctx.name !== undefined) setName(ctx.name);
		} catch (err) {
			console.error(err);
			alert('Something went wrong');
		}
	}

	useMemo(async () => {
		console.log(profilePic);
		if (username) return;
		const response = await fetch('/api/who-am-i');
		if (response.status === 204) return router.push('/login');
		const user = await response.json();
		if (!user.username) {
			localStorage.removeItem('username');
			localStorage.removeItem('name');
			localStorage.removeItem('is-admin');
			return router.push('/login');
		}
		setUsername(user.username);
		setName(user.name);
		setProfilePic(user.profilePic);
		if (localStorage.getItem('username') !== user.username) localStorage.setItem('username', user.username);
		if (localStorage.getItem('name') !== user.name) localStorage.setItem('name', user.name);
	}, [username]);

	useMemo(() => {
		setBufferName(name);
	}, [editName]);

	if (!username) return <MessageCard message={'Fetching user information'} />;

	return (
		<div id={styles["main"]}>
			<Head>
				<title> Profile: { name } </title>
			</Head>
			<p style={{ color: 'var(--red)', fontSize: '35px', textAlign: 'center', margin: '0px' }}> Profile </p>
			<div id={styles['profile']}>
				<img src={ profilePic ? `/profile-pics/${profilePic}.webp` : '/logo.webp' } onClick={() => setModalVisible(true)}/>
				<p> 
					<span style={{ color: 'var(--red)' }}>Name: </span> 
					{ editName ? <input value={bufferName} onChange={e => setBufferName(e.target.value.trim())} style={{ color: 'var(--black-100)', fontSize: '16px' }} /> : name }
					{ editName ? 
						<><button className="light" onClick={async () => {
							await submitFunction({ name: bufferName });
							setEditName(false);
						}}> Save </button> <button className="light" onClick={() => setEditName(false)}> Back </button> </> :
						<button className="light" onClick={() => setEditName(true)}> Edit </button>
					}
				</p>
				<p> <span style={{ color: 'var(--red)' }}>Username:</span> { username } </p>
			</div>
			<EditProfilePictureModal 
				visible={modalVisible} profilePic={profilePic}
				submitFunction={submitFunction} hideFunction={() => setModalVisible(false)}
			/>
			<button className="light" onClick={() => router.push('/logout')}> Logout </button>
		</div>
	)
}
