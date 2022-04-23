import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBarUser } from '../componentes/ui/NavBarUser';
import { RutaError } from '../componentes/ui/RutaError';
import { EditInfoProject } from '../componentes/users/EditInfoProject';
import { FormAddProject } from '../componentes/users/FormAddProject';
import { FormAddRelease } from '../componentes/users/FormAddRelease';
import { Perfil } from '../componentes/users/Perfil';
import { Projects } from '../componentes/users/Projects';
import { Publications } from '../componentes/users/Publications';
import { User } from '../componentes/users/User';

export const UserDashBoard = () => {
  return (
    <>
        <NavBarUser/>
        <div>
                <Routes>
                    <Route  path="/" element={ <User /> } />
                    <Route path='proyectos' element={ <Projects/> } />
                    <Route path='publicaciones' element={ <Publications/> } />
                    <Route path='perfil' element={ <Perfil /> } />
                    <Route path='addproject' element={ <FormAddProject /> } />
                    <Route path='addpublication' element={ <FormAddRelease /> } />
                    <Route path='morepublication' element={ <FormAddRelease /> } />
                    <Route path='moreproject:idProject' element={ <EditInfoProject /> } />
                    <Route path="*" element={ <RutaError />} />
                </Routes>
        </div>
    </>
  )
}