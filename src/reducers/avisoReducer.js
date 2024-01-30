//Uso de Types
import { types } from '../types/types';

//Definición del estado de avisos
const initialState = {
	avisos: [],
}

export const avisoReducer = (state = initialState, action) => {
	switch (action.type) {

		//Set nuevo aviso
		case types.avisoAddNew:
			return {
				...state,
				avisos: [action.payload, ...state.avisos]
			}

		//Set cargar avisos
		case types.avisoLoad:
			return {
				...state,
				avisos: [...action.payload]
			}
		default:
			return state
	}
}
