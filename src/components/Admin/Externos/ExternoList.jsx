//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { ExternoCard } from './ExternoCard';

export const ExternoList = () => {
  //Obtener los usuarios del estado
  const { usuarios } = useSelector((state) => state.user);

  //Despliegue de las tarjetas de los externos
  return (
    <>
      <div className="row">
        <div
          className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap"
          style={{ gap: '5px' }}
        >
          {
            //Filtro para obtener a los usuarios externos
            usuarios
              .filter((usuario) => usuario.rol === 'externo')
              .map((usuario) => (
                <ExternoCard key={usuario.id} {...usuario} />
              ))
          }
        </div>
      </div>
    </>
  );
};
