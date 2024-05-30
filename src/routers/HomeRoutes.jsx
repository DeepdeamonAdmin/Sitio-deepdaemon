//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de rutas hacia inicio de sesión y registro
import { Login } from '../components/auth/Login';
import { Registrer } from '../components/auth/Registrer';

//Uso de rutas hacia la barra de navegación
import { NavBar } from '../components/ui/NavBar';

//Uso de ruta de error
import { RutaError } from '../components/ui/RutaError';

//Uso de ruta hacia la página general (principal)
import { General } from '../components/Usuario/General';

export const HomeRoutes = () => {
  //Redirección de rutas hacia los componentes.
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route index element={<General />} />
          <Route path="login" element={<Login />} />
          <Route path="registrer" element={<Registrer />} />
          <Route path="*" element={<RutaError />} />
        </Routes>
      </div>
    </>
  );
};
