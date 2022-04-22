/*
    {
        publications: [],
        active: null,
        publication: {
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
    publications: [],
    active: null
}

export const publicationsReduccer = ( state = initialState, action ) => {
    
    switch (action.type) {

        case types.publicationActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }

            }
        case  types.publicationAddNew:
            return {
                ...state,
                publications: [ action.payload, ...state.publications ]
            }
        case types.publicationImgAddNew:
            return {
                ...state,
                img: action.payload
            }
        case types.publicationsLoad:
            return {
                ...state,
                publications: [...action.payload ]
            }
            
        default:
            return state
    }




}
