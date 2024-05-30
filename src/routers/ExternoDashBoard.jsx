//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta hacia la página general (principal)
import { General } from '../components/Usuario/General';

//Uso de ruta de la barra de navegación del usuario externo
import { NavBarExterno } from '../components/ui/NavBarExterno';

export const ExternoDashBoard = () => {
  //Redirección de rutas hacia los componentes.
  return (
    <>
      <NavBarExterno />
      <div>
        <Routes>
          <Route path="" element={<General />} />
        </Routes>
      </div>
    </>
  );
};
