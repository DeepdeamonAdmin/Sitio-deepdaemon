import { types } from "../types/types";

const initialState = {
	name: "",
	photo: '',
	imagenes: []
}

export const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.galleryAddNew:
			return {
				...state,
				imagenes: [action.payload, ...state.imagenes]
			}
		case types.galleryLoad:
			return {
				...state,
				imagenes: [action.payload]
			}
		case types.galleryGet:
			return {
				...state,
				datos: {
					...action.payload
				}
			}
		case types.galleryUpdate:
			return {
				...state,
				datos: {
					...action.payload
				}
			}
		default:
			return state
	}
}
