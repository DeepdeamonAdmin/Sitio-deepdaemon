//Uso de React
import React from 'react';

//Componentes necesarios
import { ExternoList } from './ExternoList';

export const ExternoScreen = () => {
  //Despliegue de la lista de los usuarios externos
  return (
    <>
      <div className="Container">
        <div className="row">
          <div className="col mb-3">
            <h1> Externos DeepDaemon </h1>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center">Externos Inscritos</h3>
        <ExternoList />
      </div>
    </>
  );
};
