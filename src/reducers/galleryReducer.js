import { types } from '../types/types';

const initialState = {
	url: '',
	imagenes: []
}
export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.userFileLoad:
			return {
				...state,
				url: action.payload
			}
		default:
			return state;
	}
}
