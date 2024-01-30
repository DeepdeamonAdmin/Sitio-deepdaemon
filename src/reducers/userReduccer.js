//Uso de Types
import { types } from '../types/types';

//Definición del estado del usuario
const initialState = {
    rol: 'other',
    active: null,
    usuarios: []
}

export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        //Set rol de usuario
        case types.userRolGet:
            return{
                ...state,
                rol: action.payload,
            }

        //Set usuario
        case types.userGet:
            return{
                ...state,
                datos: {
                    ...action.payload
                }
            }

        //Set datos activo
        case types.dataActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }

        //Set actualización de usuario
        case types.userUpdate:
            return{
                ...state,
                datos: {
                    ...action.payload
                }
            }

        //Set cargar los usuarios
        case types.usersLoad:
            return {
                ...state,
                usuarios: [...action.payload ]
            }

        
        default:
            return state;
    }

    
  
}
