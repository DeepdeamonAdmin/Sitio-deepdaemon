//Uso de Types
import { types } from '../types/types';

//Definición del estado de los videos de YouTube
const initialState = {
  videos: [],
};
export const youtubeReducer = (state = initialState, action) => {
  switch (action.type) {
    //Set nuevo video
    case types.youtubeAddNew:
      return {
        ...state,
        videos: [action.payload, ...state.videos],
      };

    //Set carga de videos
    case types.youtubeLoad:
      return {
        ...state,
        videos: [...action.payload],
      };
    default:
      return state;
  }
};
