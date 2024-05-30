//Uso de React
import React from 'react';

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import FormAddInstitution from './FormAddInstitution';

const InstitucionesScreen = () => {
  //Obtención de las instituciones del estado
  const { instituciones } = useSelector((state) => state.institutions);

  //Despliegue de la pantalla principal del apartado de Instituciones
  return (
    <div className="col">
      <h2> Agregar Institución </h2>
      <hr />
      <FormAddInstitution />
      <div className="d-flex flex-column">
        {instituciones.map((inst) => (
          <span className="p-2">{inst.name}</span>
        ))}
      </div>
    </div>
  );
};

export default InstitucionesScreen;
