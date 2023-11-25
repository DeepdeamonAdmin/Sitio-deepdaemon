

import { types } from '../types/types';

const initialState = {
	name: "",
    desc: "",
	avisos: [],
}

export const avisoReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.avisoAddNew:
			return {
				...state,
				avisos: [action.payload, ...state.avisos]
			}
		case types.avisoLoad:
			return {
				...state,
				avisos: [...action.payload]
			}
		default:
			return state
	}
}
