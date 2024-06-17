import Head from "next/head";
import Link from "next/link";

import InstructionField from "@/components/live/utils/InstructionField";

export default function Instructions() {
	return (
		<>
			<Head>
				<title> {`Instructions - OCAQ'24`} </title>
			</Head>
			<InstructionField title={'Instructions'}>
				<ul>
					<li> Ideally all instructions will be listed in a unordered list like this. </li>
					<li>
						As for nested lists, I guess we can do something like this:
						<ol>
							<li> First sublist item </li>
							<li>
								Second sublist item
								<ul>
									<li> Another sublist level for maybe notes idk </li>
								</ul>
							</li>
						</ol>
					</li>
					<li> Once they are all done, all you will have to do is let them read </li>
					<li> This shit is more optimized for desktop/lanscape displays BTW. I cannot guarantee how good it will be in mobile devices. </li>
				</ul>
				<br />
				For more information, <Link href={'/contact'}>contact us</Link>.

				<button className="light"><Link href={'/'} style={{ color: 'var(--black-100)', textDecoration: 'none' }}> Go Back </Link></button>
			</InstructionField>
		</>
	);
}
