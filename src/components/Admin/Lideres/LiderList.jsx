//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import { LiderCard } from './LiderCard';

export const LiderList = () => {
  //Obtener del estado los usuarios
  const { usuarios } = useSelector((state) => state.user);

  //Despligue de las tarjetas de los usuarios del tipo lider
  return (
    <>
      <div className="row">
        <div
          className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap"
          style={{ gap: '5px' }}
        >
          {usuarios
            .filter((usuario) => usuario.grado === 'leader')
            .map((usuario) => (
              <LiderCard key={usuario.id} {...usuario} />
            ))}
        </div>
      </div>
    </>
  );
};
