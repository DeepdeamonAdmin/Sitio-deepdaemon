import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBarUser } from '../componentes/ui/NavBarUser';
import { RutaError } from '../componentes/ui/RutaError';
import { EditInfoTesis } from '../componentes/users/EditInfoTesis';
import { FormAddTesis } from '../componentes/users/FormAddTesis';
import { FormAddRelease } from '../componentes/users/FormAddRelease';
import { Perfil } from '../componentes/users/Perfil';
//import { Projects } from '../componentes/users/Projects';
import { Tesis } from '../componentes/users/Tesis';
import { Publications } from '../componentes/users/Publications';
import { User } from '../componentes/users/User';
import { Blog } from '../componentes/users/Blog';
import { PublicationDetails } from '../componentes/Usuario/PublicationDetails';
//import { Projects } from '../componentes/users/Projects';

export const UserDashBoard = () => {
  return (
    <>
        <NavBarUser/>
        <div>
                <Routes>
                    <Route  path="/" element={ <User /> } />
                    <Route path='tesis' element={ <Tesis/> } />
                    <Route path='publicaciones' element={ <Publications/> } />
                    <Route path='blog' element={ <Blog /> } />
                    <Route path='perfil' element={ <Perfil /> } />
                    <Route path='addTesis' element={ <FormAddTesis /> } />
                    <Route path='addpublication' element={ <FormAddRelease /> } />
                    <Route path='editPublication/:idRelease' element={ <FormAddRelease /> } exact/>
                    <Route path='tesis/:idTesis/:params' element={ <EditInfoTesis /> } exact/>
                    <Route path="*" element={ <RutaError />} />
                </Routes>
        </div>
    </>
  )
}
