import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

import styles from '@/styles/Profile.module.css';

const profilePictures = [
	null,
	'bankai',
	'eggy-sensei',
	'poke-ball',
	'straw-hat',
	'dragon-ball',
	'itachi-mangekyou',
	'rimuru-slime'
]
export default function EditProfilePictureModal ({ visible, profilePic, submitFunction, hideFunction }) {
	const [selected, setSelected] = useState(profilePic);

	function toggleSelect (value) {
		if (selected === value) setSelected(null);
		else setSelected(value);
	}

	async function submit () {
		await submitFunction({ profilePic: selected });
		hideFunction();
	}

	return (
		<div id={styles['edit-pic-modal']} className={styles[visible || 'hidden']}>
			<div>
				<div style={{
					textAlign: 'right',
					display: 'block',
					color: 'var(--red)'
				}}>
					<FaRegWindowClose size={'25px'} fill="var(--red)" onClick={hideFunction} />
				</div>
				<div>
					{
						profilePictures.map(pic => (
							<img
								key={pic}
								src={ pic ? `/profile-pics/${pic}.webp` : `/logo.webp` }
								className={ selected == pic ? styles['selected'] : '' }
								onClick={() => toggleSelect(pic)}
							/>
						))
					}
				</div>
				<button className="light" onClick={submit}> Update </button>
			</div>
		</div>
	)
}
