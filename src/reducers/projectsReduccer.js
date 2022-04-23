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
    projects: [],
    projectsAll: [],
    active: null
}

export const projectsReduccer = ( state = initialState, action ) => {
    
    switch (action.type) {

        case types.projectActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }

            }
        case  types.projectAddNew:
            return {
                ...state,
                projects: [ action.payload, ...state.projects ]
            }
        case types.projectImgAddNew:
            return {
                ...state,
                img: action.payload
            }
        case types.projectsLoad:
            return {
                ...state,
                projects: [...action.payload ]
            }
            
        case types.projectsAllLoad:
            return {
                ...state,
                projectsAll: [...action.payload ]
            }
    
            
        default:
            return state
    }




}
