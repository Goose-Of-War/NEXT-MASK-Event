import { useEffect, useState } from "react";

import MCQOption from "./MCQOption";

export default function OptionField ({ options, updateFunction }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const selectOption = option => {
		if (selectedOption === option) setSelectedOption(null);
		else setSelectedOption(option);
	};

	// useEffect(() => {
	// 	const timeout = setTimeout(() => console.log({selectedOption}));
	// 	return () => clearTimeout(timeout);
	// });

	return (
		<>
			{
				options.map((val, ind) => <MCQOption
					key={ ind }
					value={ val }
					option={ 'ABCD'[ind] }
					selected={ selectedOption === ind }
					onClick={ () => selectOption(ind) }
				/>)
			}
		</>
	);
}
