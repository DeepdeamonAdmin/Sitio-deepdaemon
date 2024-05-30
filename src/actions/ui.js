//Componentes necesarios
import { types } from '../types/types';

//Función para publicar en el estado el mensaje de error
export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

//Función para publicar en el estado la eliminación del mensaje de error
export const removeError = () => ({
  type: types.uiRemoveError,
});

//Función para publicar en el estado el mensaje de cargar
export const startLoading = () => ({
  type: types.uiStartLoading,
});

//Función para publicar en el estado el mensaje de finalización de carga
export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

//Función para publicar en el estado el mensaje de apertura de modal
export const uiOpenModal = () => ({ type: types.uiOpenModal });

//Función para publicar en el estado el mensaje de cierre de modal
export const uiCloseModal = () => ({ type: types.uiCloseModal });
