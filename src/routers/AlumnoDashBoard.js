//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta de la barra de navegación del alumno
import { NavBarUser } from '../componentes/ui/NavBarUser';

//Uso de ruta de error
import { RutaError } from '../componentes/ui/RutaError';

//Uso de rutas hacia pantallas principales de cada categoría
import { Perfil } from '../componentes/Alumno/Perfil';
import { Tesis } from '../componentes/Alumno/Tesis';
import { Publications } from '../componentes/Alumno/Publications';
import { User } from '../componentes/Alumno/User';

//Uso de rutas hacia formularios
import { FormAddRelease } from '../componentes/Alumno/FormAddRelease';
import { FormAddTesisGrado } from '../componentes/Admin/Tesis/FormAddTesisGrado';
import { FormAddTesisMaestria } from '../componentes/Admin/Tesis/FormAddTesisMaestria';
import { FormAddTesisDoctorado } from '../componentes/Admin/Tesis/FormAddTesisDoctorado';
import { EditInfoTesis } from '../componentes/Alumno/EditInfoTesis';

export const AlumnoDashBoard = () => {

  //Redirección de rutas hacia los componentes.
  return (
    <>
        <NavBarUser/>
        <div>
                <Routes>
                    <Route  path="" element={ <User /> } />
                    <Route path='tesis' element={ <Tesis/> } />
                    <Route path='publicaciones' element={ <Publications/> } />
                    <Route path='perfil' element={ <Perfil /> } />
                    <Route path='addTesisGrado' element={ <FormAddTesisGrado /> } />
                    <Route path='addTesisMaestria' element={ <FormAddTesisMaestria /> } />
                    <Route path='addTesisDoctorado' element={ <FormAddTesisDoctorado /> } />
                    <Route path='addpublication' element={ <FormAddRelease /> } />
                    <Route path='editPublication/:idRelease' element={ <FormAddRelease /> } exact/>
                    <Route path='tesis/:idTesis/:params' element={ <EditInfoTesis /> } exact/>
                    <Route path="*" element={ <RutaError />} />
                </Routes>
        </div>
    </>
  )
}
