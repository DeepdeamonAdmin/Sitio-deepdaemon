//Uso de React
import { useState } from "react"

export const useForm = (initialState = {}, publication) => {

	//Configuración del hook del estado
	const [values, setValues] = useState(publication || initialState);

	//función reset
	const reset = () => {
		setValues(initialState);
	}

	//Función de cambio en el campo
	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.hasOwnProperty['files'] ? target.files[0] : target.value
		});
	}
	return [values, handleInputChange, reset];
}
