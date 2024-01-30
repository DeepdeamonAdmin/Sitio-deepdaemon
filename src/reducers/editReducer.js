//Uso de Types
import { types } from '../types/types';

//Definición del estado de edición de proyecto
const initialState = {
    id:"",
    update: false,
};

export const editReducer = (state = initialState, action) => {
    switch ( action.type ) {

        //Set edición de proyecto
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
