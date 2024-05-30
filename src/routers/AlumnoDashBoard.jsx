//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta de la barra de navegación del alumno
import { NavBarUser } from '../components/ui/NavBarUser';

//Uso de ruta de error
import { RutaError } from '../components/ui/RutaError';

//Uso de ruta hacia la página general (principal)
import { General } from '../components/Usuario/General';

//Uso de rutas hacia pantallas principales de cada categoría
import { Perfil } from '../components/Alumno/Perfil';
import { Tesis } from '../components/Alumno/Tesis';
import { Publications } from '../components/Alumno/Publications';
import { GalleryScreen } from '../components/Admin/Galeria/GalleryScreen';

//Uso de rutas hacia formularios
import { FormAddRelease } from '../components/Alumno/FormAddRelease';
import { FormAddTesisGrado } from '../components/Admin/Tesis/FormAddTesisGrado';
import { FormAddTesisMaestria } from '../components/Admin/Tesis/FormAddTesisMaestria';
import { FormAddTesisDoctorado } from '../components/Admin/Tesis/FormAddTesisDoctorado';
import { EditInfoTesis } from '../components/Alumno/EditInfoTesis';

export const AlumnoDashBoard = () => {
  //Redirección de rutas hacia los componentes.
  return (
    <>
      <NavBarUser />
      <div>
        <Routes>
          <Route path="" element={<General />} />
          <Route path="tesis" element={<Tesis />} />
          <Route path="publicaciones" element={<Publications />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="addTesisGrado" element={<FormAddTesisGrado />} />
          <Route path="addTesisMaestria" element={<FormAddTesisMaestria />} />
          <Route path="addTesisDoctorado" element={<FormAddTesisDoctorado />} />
          <Route path="addpublication" element={<FormAddRelease />} />
          <Route
            path="editPublication/:idRelease"
            element={<FormAddRelease />}
            exact
          />
          <Route
            path="tesis/:idTesis/:params"
            element={<EditInfoTesis />}
            exact
          />
          <Route path="galery" element={<GalleryScreen />} />
          <Route path="*" element={<RutaError />} />
        </Routes>
      </div>
    </>
  );
};
