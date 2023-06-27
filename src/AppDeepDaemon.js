import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';
import { startLogout } from './actions/auth';


export const AppDeepDaemon = () => {
    /**
     * Esta constante indica el número de minutos de inactividad
     */
    const MINUTES_TO_EXPIRE = 10;

    let timer;

    /**
     * Esta función se encarga de reestablecer el timer cada que se mande a llamar
     * en el evento del mousemove
     */
    const resetTimer = () => {
        // Cada que se entra a esta función se debe limpiar el timer porque si entra a esta función
        // significa que el usuario está moviendo el mouse (o sea, está teniendo actividad en el sitio)
        clearTimeout(timer);
        // Si no se mueve el mouse, esta función no vuelve a ser llamada, por lo que sigue a las siguientes líneas
        // y es en estas en donde se establece un timeout que va a ejecutar el logout después del tiempo establecido
        timer = setTimeout(() => {
            store.dispatch(startLogout())
        }, MINUTES_TO_EXPIRE * 60 * 1000)
    }

    /**
     * Esta función inicializa el timer y agrega un evento de mouse
     */
    const startTimer = () => {
        resetTimer();
        document.addEventListener('mousemove', resetTimer);
    }

    startTimer();
    return (

        <Provider store={store}>
            <AppRouter />
        </Provider>

    )
}
