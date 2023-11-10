//Uso de React
import React from 'react';
import ReactDOM from 'react-dom';

// Hojas de estilo
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import { AppDeepDaemon } from './AppDeepDaemon.js';

// indicamos la seccion en index.html
const divRoot = document.querySelector('#app')  

// mandamos los elementos
ReactDOM.render(
    <AppDeepDaemon />, 
divRoot);   

//Script generado por default al crear una aplicación en React.
//No contribuye nada las páginas o en el DOM, sin embargo, sirve para funciones extras como caché
//para cuando el usuario está offline o con conexión lenta.
serviceWorker.unregister();
