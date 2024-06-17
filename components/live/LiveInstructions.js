import Link from "next/link";
import InstructionField from "./utils/InstructionField";


export default function LiveInstructions ({ buttonCallback }) {
	return (<InstructionField title={ 'Open Campus Anime Quiz - 2024' }>
		<ul>
			<li> Again, instructions will be shared in a bullet list like in the <Link href='/instructions'> instructions </Link> page. </li>
			<li>
				You can list the different types of questions like this:
				<ol>
					<li>
						MCQ Type:
						<ul>
							<li> Time: 10 seconds </li>
							<li> Points: Correct: 100, Incorrect: 0 </li>
						</ul>
					</li>
					<li>
						Text Type:
						<ul>
							<li> Time: 20 seconds </li>
							<li> Points:
								<br/ > &emsp; Correct: 200
								<br/ > &emsp; Partial (upto 80% accuracy): 150
								<br/ > &emsp; Partial (upto 60% accuracy): 100
								<br/ > &emsp; Incorrect: 0
							</li>
							The accuracy is calculated using Levenshtein-Damerau algorithm.
						</ul>
					</li>
				</ol>
			</li>
			<li> Once you have shared all instructions, you can just place the button to start the quiz. </li>
		</ul>
		<br />
		Ganbatte!!! All the best!!!
		<br />
		<button className='light' onClick={buttonCallback}> Start Quiz </button>
	</InstructionField>);
}
