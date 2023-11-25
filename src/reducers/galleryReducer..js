import { types } from "../types/types";

const initialState = {
	name: "",
	gallery: [],
	galleryAll: []
}

export const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.galleryAddNew:
			const gallery_unique = state.gallery.find((gallery_unique) => gallery_unique.id === action.payload.type);
			gallery_unique.gallery = [action.payload, ...gallery_unique.gallery];
			return {
				...state,
				gallery: [...state.gallery]
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
