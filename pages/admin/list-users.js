import { useEffect, useMemo, useState } from "react";

import ForbiddenCard from "@/components/admin/ForbiddenCard";
import MessageCard from "@/components/live/utils/MessageCard";
import AdminContent from "@/components/admin/AdminContent";
import UserComponent from "@/components/admin/UserComponent";

import styles from '@/styles/Admin.module.css';

export default function ListUsersPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setHasChecked(localStorage.getItem('is-admin'));
		setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
	});

	useMemo(async () => {
		if (!hasChecked) {
			if (!localStorage.getItem('username')) return setIsAdmin(false);
			try {
				const response = eval(await (await fetch('/api/check-admin')).text());
				localStorage.setItem('is-admin', response);
				setIsAdmin(response);
			} catch (err) {
				console.log(err);
			}
		} else {
			setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
		}
	}, [hasChecked]);

	useMemo(async () => {
		if (!isAdmin || users.length) return;
		try {
			const response = eval(await (await fetch('/api/fetch-users')).json());
			setUsers(response);
		} catch (err) {
			console.log(err);
		}
	}, [isAdmin]);

	if (!isAdmin) return <ForbiddenCard />;

	if (!users?.length) return <MessageCard message={'Fetching users...'} />;

	return (
		<AdminContent title={`Users List: OCAQ '24`}>
			<div id={styles['users-container']}>
				{
					users.map((user, index) => <UserComponent user={user} key={user.username} removeSelf={() => setUsers(
						users.filter((_, i) => i !== index)
					)} />)
				}
			</div>
		</AdminContent>
	);
}
