//Uso de Types
import { types } from '../types/types';

//Definición del estado de las tesis
const initialState = {
    tesis: [],
    active: null
}

export const tesisReducer = ( state = initialState, action ) => {
    
    switch (action.type) {

        //Set tesis activa
        case types.tesisActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }

            }

        //Set nueva tesis
        case  types.tesisAddNew:
            return {
                ...state,
                tesis: [ action.payload, ...state.tesis ]
            }

        //Set cargar tesis
        case types.tesisLoad:
            return {
                ...state,
                tesis: [...action.payload ]
            } 
        default:
            return state
    }

}
