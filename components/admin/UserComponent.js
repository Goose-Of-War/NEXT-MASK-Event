import styles from '@/styles/Admin.module.css'
import { useRouter } from 'next/router'

export default function UserComponent ({ user, removeSelf }) {
	const router = useRouter();

	function editUser () {
		return router.push(`/admin/edit-user/${user._id}`);
	}

	async function deleteUser () {
		if (!confirm('Are you sure you want to delete?')) return;
		try {
			const response = await fetch('/api/delete-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ _id: user._id })
			});
			if (response.status === 201) {
				alert('Successfully deleted');
				return removeSelf();
			} else throw await response.text();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className={styles['user-card']}>
			<div>
				<img src={ user.profilePic ? `/profile-pics/${user.profilePic}.webp` : '/logo.webp' } alt={user.name} />
			</div>
			<div>
				<p><span> Name: </span> { user.name } </p>
				<p><span> Username: </span> { user.username } </p>
				<div>
					<button onClick={editUser}> Edit </button>
					<button onClick={deleteUser}> Delete </button>
				</div>
			</div>
		</div>
	)
}
