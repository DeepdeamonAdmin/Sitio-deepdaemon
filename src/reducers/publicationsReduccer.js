import { types } from '../types/types';

//Definición del estado de las publicaciones
const initialState = {
  publications: [],
  active: null,
};

export const publicationsReduccer = (state = initialState, action) => {
  switch (action.type) {
    //Set publicación activa
    case types.publicationActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    //Set nueva publicación
    case types.publicationAddNew:
      return {
        ...state,
        publications: [action.payload, ...state.publications],
      };

    //Set cargar publicaciones
    case types.publicationsLoad:
      return {
        ...state,
        publications: [...action.payload],
      };

    //Set nuevo Bibtex
    case types.publicationsBibtexAddNew:
      return {
        ...state,
        bibtexprueba: action.payload,
      };
    default:
      return state;
  }
};
