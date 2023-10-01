//Uso de React
import React from 'react';
import ReactDOM from 'react-dom';

// Hojas de estilo
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import { AppDeepDaemon } from './AppDeepDaemon.js';

const divRoot = document.querySelector('#app')  // indicamos la seccion en index.html

ReactDOM.render(
    <AppDeepDaemon />, 
divRoot);   // mandamos los elementos

//Script generado por default al crear una aplicación en React.
//No contribuye nada las páginas o en el DOM, sin embargo, sirve para funciones extras como caché
//para cuando el usuario está offline o con conexión lenta.
serviceWorker.unregister();
