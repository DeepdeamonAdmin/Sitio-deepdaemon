import { types } from '../types/types';
const initialState = {
	videos: [],
}
export const youtubeReducer = (state = initialState, action) =>{
    switch (action.type){
        case types.youtubeAddNew:
			return {
				...state,
				videos: [action.payload, ...state.videos]
			}
        case types.youtubeLoad:
            return{
                ...state,
                videos: [...action.payload]
            }
        default:
            return state
    }
}