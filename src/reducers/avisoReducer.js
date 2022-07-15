

import { types } from '../types/types';

const initialState = {
	name: "",
    desc: "",
	imagenes: [],
	imagenesAll: []
}

export const avisoReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.avisoAddNew:
			return {
				...state,
				imagenes: [action.payload, ...state.imagenes]
			}
		case types.avisoAddNewPhoto:
			return {
				...state,
				img: action.payload
			}
		case types.avisoLoad:
			return {
				...state,
				imagenes: [...action.payload]
			}
		case types.avisoAllLoad:
			return {
				...state,
				imagenesAll: [...action.payload]
			}
		default:
			return state
	}
}
