import { types } from '../types/types';

const initialState = {
    registro: false,
};


export const registerReducer = (state = initialState, action) => {
   
    switch ( action.type ) {
        case types.regMember:
            return{
                ...state,
                registro: true,
                name: action.payload.name,
                email: action.payload.email
            };

        case types.regProject:
            return{
                ...state,
                registro: true,
                name: action.payload.name
            };
        case types.regInstitution:
            return{
                ...state,
                registro: true,
                name: action.payload.name
            };
        
        case types.regCareer:
            return{
                ...state,
                registro: true,
                name: action.payload.name
            };
        case types.regTeach:
            return{
                ...state,
                registro: true,
                name: action.payload.name
            }
        
        case types.regRelease:
            return{
                ...state,
                registro: true,
                name: action.payload.name
            };

        default:
            return state;
    }
}
