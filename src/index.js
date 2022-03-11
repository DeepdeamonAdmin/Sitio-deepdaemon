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

serviceWorker.unregister(); //No se aun para que es 
