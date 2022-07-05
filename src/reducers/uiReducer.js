import { types } from '../types/types';


const initialState = {
	loadding: false,
	msgError: null,
	modalOpen: false,
	modalEditOpen: false,
};

export const uiReduccer = (state = initialState, action) => {

	switch (action.type) {
		case types.uiSetError:
			return {
				...state,
				msgError: action.payload
			};

		case types.uiRemoveError:
			return {
				...state,
				msgError: null
			};

		case types.uiStartLoading:
			return {
				...state,
				loading: true
			};

		case types.uiFinishLoading:
			return {
				...state,
				loading: false
			};

		case types.uiOpenModal:
			return {
				...state,
				modalOpen: true,
				modalEditOpen: false
			};
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false,
				modalEditOpen: false
			};
		case types.uiOpenModalEdit:
			return {
				...state,
				modalOpen: false,
				modalEditOpen: true
			}
		case types.uiCloseModalEdit:
			return {
				...state,
				modalOpen: false,
				modalEditOpen: false
			};

		default:
			return state;
	}

}