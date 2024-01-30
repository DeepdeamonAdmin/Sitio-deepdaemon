//Uso de Types
import { types } from "../types/types";

//Definición del estado de las instituciones
const initialState = {
	instituciones: [],
}

export const institucionReducer = (state = initialState, action) => {
	switch (action.type) {

		//Set nueva institución
		case types.institucionAddNew:
			return {
				...state,
				instituciones: [action.payload, ...state.instituciones]
			}

		//Set cargar instituciones	
		case types.institucionLoad:
			return {
				...state,
				instituciones: [...action.payload]
			}
		default:
			return state;
	}

}
