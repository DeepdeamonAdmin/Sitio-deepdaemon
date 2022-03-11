import { types } from '../types/types';

const initialState = {
    update: false,
};

export const editReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case types.editProject:
            return{
                ...state,
                update: true,
                id: action.payload.name,
            };
            default:
                return state;
        }
}
