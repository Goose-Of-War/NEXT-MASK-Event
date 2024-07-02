import { useEffect, useState } from "react";

import MCQOption from "./MCQOption";

export default function OptionField ({ options, updateFunction }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const selectOption = option => {
		if (selectedOption === option) {
			setSelectedOption(null);
			updateFunction(null);
		}
		else {
			setSelectedOption(option);
			updateFunction(option);
		}
	};

	// useEffect(() => {
	// 	const timeout = setTimeout(() => console.log({selectedOption}));
	// 	return () => clearTimeout(timeout);
	// });

	return (
		<>
			{
				options.map((val, ind) => <MCQOption
					key={ ind + 1 }
					value={ val }
					option={ 'ABCD'[ind] }
					selected={ selectedOption === ind + 1 }
					onClick={ () => selectOption(ind + 1) }
				/>)
			}
		</>
	);
}
