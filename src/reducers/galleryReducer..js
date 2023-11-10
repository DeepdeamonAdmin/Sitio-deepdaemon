import { types } from "../types/types";

const initialState = {
	name: "",
	gallery: [],
	galleryAll: []
}

export const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.galleryAddNew:
			return {
				...state,
				gallery: [action.payload, ...state.gallery]
			}
		case types.galleryAddNewPhoto:
			return {
				...state,
				image: action.payload
			}
		case types.galleryLoad:
			return {
				...state,
				gallery: [...action.payload]
			}
		case types.galleryAllLoad:
			return {
				...state,
				galleryAll: [...action.payload]
			}
		default:
			return state
	}
}
