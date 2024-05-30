//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta hacia la página general (principal) de la version mobile
import { GeneralMobile } from '../components/Usuario/GeneralMobile';

//Uso de rutas hacia la barra de navegación sin autenticación
import { NavBarMobileSinAuth } from '../components/ui/NavBarMobileSinAuth';

//Uso de rutas hacia inicio de sesión y registro
import { Login } from '../components/auth/Login';
import { Registrer } from '../components/auth/Registrer';

//Uso de ruta de error
import { RutaError } from '../components/ui/RutaError';

export const MobileDashBoardSinAuth = () => {
  //Redirección de rutas hacia los componentes.
  return (
    <>
      <NavBarMobileSinAuth />
      <div>
        <Routes>
          <Route path="" element={<GeneralMobile />} />
          <Route path="login" element={<Login />} />
          <Route path="registrer" element={<Registrer />} />
          <Route path="*" element={<RutaError />} />
        </Routes>
      </div>
    </>
  );
};
