import { useState } from "react";

const capitalizeString = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

export default function InputField ({ name, type, updateFunction, enterCheck }) {
	const [value, setValue] = useState('');

	const handleChange = event => {
		const readValue = event.target.value.trim();
		setValue(readValue);
		updateFunction(readValue);
	}

	return ( <input 
		name={name} type={type || 'text'} placeholder={capitalizeString(name)}
		value={value} onChange={handleChange}
	/>)
}
