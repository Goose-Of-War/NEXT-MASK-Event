import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import ForbiddenCard from "@/components/admin/ForbiddenCard";
import MessageCard from "@/components/live/utils/MessageCard";
import AuthForm from "@/components/AuthForm";
import InputField from "@/components/AuthForm/InputField";

export default function ListUsersPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState({});

	const router = useRouter();
	const _id = useRef(router.query._id);

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
	}, [hasChecked])

	useMemo(async () => {
		if (!isAdmin || user?._id) return;
		try {
			const response = await fetch(`/api/fetch-user?id=${_id.current}`);
			if (response.status !== 200) throw await response.text();
			setUser(await response.json());
		} catch (err) {
			console.error(err);
		}
	}, [isAdmin]);

	if (!isAdmin) return <ForbiddenCard />;

	if (!user?._id) return <MessageCard message={'Fetching user...'} />;

	return <MessageCard message={'Work in progress'} />;

	// return (
	// 	<AuthForm heading={'Edit User: ' + user?.name}>
	// 		<InputField name='Name' val={user?.name} updateFunction={
	// 			value => setUser({
	// 				...user, name: value
	// 			})
	// 		} />
	// 	</AuthForm>
	// );
}
