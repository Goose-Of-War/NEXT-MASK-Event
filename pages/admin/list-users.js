import { useEffect, useMemo, useState } from "react";

import ForbiddenCard from "@/components/admin/ForbiddenCard";
import MessageCard from "@/components/live/utils/MessageCard";

export default function ListUsersPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

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

	if (!isAdmin) return <ForbiddenCard />;

	return <MessageCard message={'Work in progress'} />;
}
