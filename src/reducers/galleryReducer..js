import { types } from "../types/types";

const initialState = {
	name: "",
	imagenes: [],
	imagenesAll: []
}

export const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.galleryAddNew:
			return {
				...state,
				imagenes: [action.payload, ...state.imagenes]
			}
		case types.galleryAddNewPhoto:
			return {
				...state,
				img: action.payload
			}
		case types.galleryLoad:
			return {
				...state,
				imagenes: [...action.payload]
			}
		case types.galleryAllLoad:
			return {
				...state,
				imagenesAll: [...action.payload]
			}
		default:
			return state
	}
}
