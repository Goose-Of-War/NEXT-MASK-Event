import { BiLogoGithub, BiLogoYoutube, BiLogoGmail, BiLogoFacebookSquare, BiLogoInstagram } from 'react-icons/bi';

import styles from '@/styles/Footer.module.css';

const footerLinks = [
	{ name: 'YouTube', href: 'https://www.youtube.com/@maskiitkgp', Icon: BiLogoYoutube },
	{ name: 'Instagram', href: 'https://www.instagram.com/maskiitkgp', Icon: BiLogoInstagram },
	{ name: 'Facebook', href: 'https://www.facebook.com/maskiitkgp', Icon: BiLogoFacebookSquare },
	{ name: 'Gmail', href: 'mailto:kgpmask@gmail.com', Icon: BiLogoGmail },
	{ name: 'GitHub', href: 'https://github.com/kgpmask/MASK', Icon: BiLogoGithub }
];

export default function Footer () {

	return (
		<footer>
			<p id={styles['main-link']}>
				Check out the <br />
				<a href='https://kgpmask.club/' title='MASK' target='_blank'> Main Website </a>
			</p>
			<div id={styles['social-links']}>
				{ footerLinks.map(({ name, href, Icon }) => (
					<a href={href} title={name} target='_blank' className={styles['social-link']} key={name}> <Icon size={46} className={styles['social-link']} /> </a>
				)) }
			</div>
		</footer>
	);
}
