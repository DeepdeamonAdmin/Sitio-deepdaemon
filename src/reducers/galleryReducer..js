//Uso de Types
import { types } from "../types/types";

//Definición del estado de la galería
const initialState = {
	image: "",
	gallery: [],
}

export const galleryReducer = (state = initialState, action) => {
	switch (action.type) {

		//Set nueva imagen en galería (Documento)
		case types.galleryAddNew:
			const gallery_unique = state.gallery.find((gallery_unique) => gallery_unique.id === action.payload.type);
			gallery_unique.gallery = [action.payload, ...gallery_unique.gallery];
			return {
				...state,
				gallery: [...state.gallery]
			}

		//Set nuevva imagen en galería (Archivo)
		case types.galleryAddNewPhoto:
			return {
				...state,
				image: action.payload
			}

		//Set cargar galería
		case types.galleryLoad:
			return {
				...state,
				gallery: [...action.payload]
			}
		default:
			return state
	}
}
