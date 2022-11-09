import { useState } from "react"


export const useForm = (initialState = {}) => {
console.log("iE "+initialState);
	const [values, setValues] = useState(initialState);
	console.log("values: " +values);
	const reset = () => {
		setValues(initialState);
	}


	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value
		});

	}
	console.log("handleInputChange: " +handleInputChange);

	return [values, handleInputChange, reset];

}
