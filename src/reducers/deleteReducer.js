import { types } from '../types/types';

const initialState = {
    delete: false,
};

export const deleteReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case types.delProject:
            return{
                ...state,
                delete: true,
                id: action.payload.name,
            };
            default:
                return state;
        }
}
