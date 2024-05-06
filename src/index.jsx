//Uso de React
import React from 'react';
import ReactDOM from 'react-dom/client';

//Hojas de estilo
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//Caché del sitio
import * as serviceWorker from './serviceWorker';

//Componente principal
import { AppDeepDaemon } from './AppDeepDaemon';

//Renderizado del componente principal
ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
			<AppDeepDaemon />
    </React.StrictMode>
  );

//Script generado por default al crear una aplicación en React.
//No contribuye nada las páginas o en el DOM, sin embargo, sirve para funciones extras como caché
//para cuando el usuario está offline o con conexión lenta.
serviceWorker.unregister();
