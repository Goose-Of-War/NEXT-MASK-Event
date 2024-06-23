import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import AuthForm from "@/components/AuthForm";
import ForbiddenCard from "@/components/admin/ForbiddenCard";
import AdminContent from "@/components/admin/AdminContent";

export default function AdminPage () {
	const [hasChecked, setHasChecked] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setHasChecked(localStorage.getItem('is-admin'));
		setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
	});
	
	useMemo(async () => {
		if (!hasChecked) {
			if (!localStorage.getItem('username')) return setIsAdmin(false);
			const response = eval(await (await fetch('/api/check-admin')).text());
			localStorage.setItem('is-admin', response);
			setIsAdmin(response);
		} else {
			setIsAdmin(eval(localStorage.getItem('is-admin') || 'false'));
		}
	}, [hasChecked])

	if (!isAdmin) return <ForbiddenCard />;

	return (<AdminContent title={'Admin Portal'}>
		<button onClick={() => router.push('/admin/list-users')}> Users Portal </button>
		<button onClick={() => router.push('/admin/quiz-portal')}> Quiz Portal </button>
		{/* <button onClick={() => router.push('/admin/')}>  </button> */}
	</AdminContent>);
}
