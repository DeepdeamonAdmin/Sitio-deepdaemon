//Uso de Types
import { types } from '../types/types';

//Definición del estado de UI
const initialState = {
	loading: false,
	msgError: null,
	modalOpen: false,
};

export const uiReduccer = (state = initialState, action) => {

	switch (action.type) {

		//Set error
		case types.uiSetError:
			return {
				...state,
				msgError: action.payload
			};

		//Set eliminar error
		case types.uiRemoveError:
			return {
				...state,
				msgError: null
			};

		//Set inicio carga
		case types.uiStartLoading:
			return {
				...state,
				loading: true
			};

		//Set finalizar carga
		case types.uiFinishLoading:
			return {
				...state,
				loading: false
			};

		//Set abrir modal
		case types.uiOpenModal:
			return {
				...state,
				modalOpen: true,
			};

		//Set cerrar modal
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false,
			};
		default:
			return state;
	}

}