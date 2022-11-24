/*
    {
        projects: [],
        active: null,
        project: {
            id: 'KASKLDJALKSDJ129387123',
            name:'',
            descripcion: '',
            impact: '',
            urlImg: '',
            urlModalMedia: '',
            link: '',
            nameTech: '',
        }
    }
*/

import { types } from '../types/types';

const initialState = {
    tesis: [],
    tesisAll: [],
    active: null
}

export const tesisReducer = ( state = initialState, action ) => {
    
    switch (action.type) {

        case types.tesisActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }

            }
        case  types.tesisAddNew:
            return {
                ...state,
                tesis: [ action.payload, ...state.projects ]
            }
        case types.tesisImgAddNew:
            return {
                ...state,
                img: action.payload
            }
        case types.tesisLoad:
            return {
                ...state,
                tesis: [...action.payload ]
            }
            
        case types.tesisAllLoad:
            return {
                ...state,
                tesisAll: [...action.payload ]
            }
    
            
        default:
            return state
    }

}
