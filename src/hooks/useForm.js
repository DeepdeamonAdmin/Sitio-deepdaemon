import { useState } from "react"


export const useForm = (initialState = {}, publication) => {
	const [values, setValues] = useState(publication || initialState);
	const reset = () => {
		setValues(initialState);
	}


	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.hasOwnProperty['files'] ? target.files[0] : target.value
		});

	}

	return [values, handleInputChange, reset];

}
