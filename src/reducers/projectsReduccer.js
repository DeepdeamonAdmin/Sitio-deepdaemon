//Uso de Types
import { types } from '../types/types';

//Definición del estado de los proyectos
const initialState = {
  projects: [],
  active: null,
};

export const projectsReduccer = (state = initialState, action) => {
  switch (action.type) {
    //Set proyecto activo
    case types.projectActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    //Set nuevo proyecto
    case types.projectAddNew:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };

    //Set cargar proyectos
    case types.projectsLoad:
      return {
        ...state,
        projects: [...action.payload],
      };
    default:
      return state;
  }
};
