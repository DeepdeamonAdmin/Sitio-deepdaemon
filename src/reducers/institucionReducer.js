import { types } from "../types/types";

const initialState = {
	name: '',
	instituciones: [],
	institucionesAll: []
}

export const institucionReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.institucionAddNew:
			return {
				...state,
				instituciones: [action.payload, ...state.instituciones]
			}
		case types.institucionAllLoad:
			return {
				...state,
				institucionesAll: [...action.payload]
			}
		case types.institucionLoad:
			return {
				...state,
				instituciones: [...action.payload]
			}

		default:
			return state;
	}

}
