import { types } from '../types/types';

export const accesoRolReduccer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.accesoRol:
            return{
                gradoColaborador: action.payload.gradoColaborador,
            }
        default:
            return state;
    }
  
}
