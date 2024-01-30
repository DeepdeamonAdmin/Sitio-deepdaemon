//Uso de Types
import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
    switch ( action.type ) {

        //Set id de usuario y nombre
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
            
        //Set logout
        case types.logout:
            return{ }
    
        default:
            return state;
    }
}
