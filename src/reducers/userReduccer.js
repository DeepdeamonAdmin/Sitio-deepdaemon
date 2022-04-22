/*
    {
        rol: tipo,
        active: null,
        datos {
        
        }
    }
*/

import { types } from '../types/types';

const initialState = {
    rol: 'other',
    active: null
}


export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.userRolGet:
            return{
                ...state,
                rol: action.payload,
            }
        case types.userGet:
            return{
                ...state,
                datos: {
                    ...action.payload
                }
            }
        case types.dataActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }   
        case types.userUpdate:
            return{
                ...state,
                datos: {
                    ...action.payload
                }
            }
        case  types.userAddNew:
            return {
                ...state,
                usuarios: [ action.payload, ...state.usuarios ]
            }

        case types.usersLoad:
            return {
                ...state,
                usuarios: [...action.payload ]
            }

        
        default:
            return state;
    }

    
  
}
