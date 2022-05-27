import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../componentes/Admin/Admin';
import { GaleryScreen } from '../componentes/Admin/Galeria/GaleryScreen';
import { MembersScreen } from '../componentes/Admin/Miembros/MembersScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { ReleaseScreen } from '../componentes/Admin/Publcaciones/ReleaseScreen';
import { OtherScreen } from '../componentes/Admin/Other/OtherScreen';
import { NavBarAdmin } from '../componentes/ui/NavBarAdmin';
import { FormEditProject } from '../componentes/Admin/Proyectos/FormEditProject';
import { RutaError } from '../componentes/ui/RutaError';
import { RegAlumn } from '../componentes/Admin/RegAlumn/RegAlumn';
import { RegLider } from '../componentes/Admin/RegLider/RegLider';

export const AdminDashBoard = () => {
    return (
        <>
          <NavBarAdmin />
            <div>
                <Routes>
                    <Route  path="/" element={ <Admin />} />
                    <Route  path="members" element={ <MembersScreen /> } />
                    <Route  path="projects" element={ <ProjectsScreen /> } />
                    <Route  path="projects/:idProject/:params" element={ <FormEditProject /> } />
                    <Route  path="release" element={ <ReleaseScreen /> } />
                    <Route  path="addmember" element={ <RegAlumn /> }  />
                    <Route  path="addlider" element={ <RegLider /> }  />
                    <Route  path="galery" element={ <GaleryScreen /> }  />
                    <Route  path="other" element={ <OtherScreen /> } />
                    

                    <Route path="*" element={ <RutaError />} />
                </Routes>
            </div>
        </>
    )
}
