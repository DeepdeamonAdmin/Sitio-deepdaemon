//Uso de React
import React, { useEffect } from 'react';
import { useState } from 'react';

//Uso de Redux
import { Provider } from 'react-redux';

//Uso de Google Analytics
import ReactGA from 'react-ga4';

//Componentes necesarios
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';
import { AppRouterMobile } from './routers/AppRouterMobile';
import { startLogout } from './actions/auth';
import { isMobile } from 'react-device-detect';

export const AppDeepDaemon = () => {
  //Constante que indica el número de minutos de inactividad
  const MINUTES_TO_EXPIRE = 10;

  //Declaración del timer
  let timer;

  //Función encargada de reestablecer el timer cada que se mande llamar en el evento del mousemove
  const resetTimer = () => {
    // Cada que se entra a esta función se debe limpiar el timer porque si entra a esta función
    // significa que el usuario está moviendo el mouse (o sea, está teniendo actividad en el sitio)
    clearTimeout(timer);

    // Si no se mueve el mouse, esta función no vuelve a ser llamada, por lo que sigue a las siguientes líneas
    // y es en estas en donde se establece un timeout que va a ejecutar el logout después del tiempo establecido
    timer = setTimeout(
      () => {
        store.dispatch(startLogout());
      },
      MINUTES_TO_EXPIRE * 60 * 1000,
    );
  };

  //Esta función inicializa el timer y agrega un evento de mouse
  const startTimer = () => {
    resetTimer();
    document.addEventListener('mousemove', resetTimer);
  };

  //Se manda a llamar a la función startTimer.
  startTimer();

  //Constante para cambiar de la versión móvil a la versión de escritorio
  const [mobileOn, setMobileOn] = useState(true);

  //Función que espera 1 segundo a que se rendericen todos los componentes
  //para después llamar al botón que tenga el id "toDeskVersion" y añadirle el evento de click
  //Este cambiará el estado de la función que verifica si se quiere seguir en la versión móvil
  setTimeout(() => {
    const changeToDeskVersion = document.getElementById('toDeskVersion');
    if (changeToDeskVersion != null)
      changeToDeskVersion.addEventListener('click', myFunction);
    function myFunction() {
      setMobileOn(false);
    }
  }, 1000);

  //Hook para renderizar en caso de que cambie el estado de la variable "mobileOn"
  useEffect(() => {}, [mobileOn]);

  //Inicialización de Google Analytics
  const TRACKING_ID = 'G-K9L3VEPV7R';
  ReactGA.initialize(TRACKING_ID);

  //Tracking con Google Analytics
  ReactGA.send(document.location.pathname);

  //Verificación de si se trata de la versión móvil o la de escritorio y redirección
  //a los componentes específicos de cada una.
  if (isMobile && mobileOn) {
    //Return del router para la versión mobile
    return (
      <Provider store={store}>
        <AppRouterMobile />
      </Provider>
    );
  } else {
    //Return del router para la versión de escritorio
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
};
