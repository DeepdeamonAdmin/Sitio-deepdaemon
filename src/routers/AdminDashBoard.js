import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Admin } from '../componentes/Admin/Admin';
import { GaleryScreen } from '../componentes/Admin/Galeria/GaleryScreen';
import { MembersScreen } from '../componentes/Admin/Miembros/MembersScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { ReleaseScreen } from '../componentes/Admin/Publcaciones/ReleaseScreen';
import { OtherScreen } from '../componentes/Admin/Other/OtherScreen';
import { NavBarAdmin } from '../componentes/ui/NavBarAdmin';
import { FormEditProject } from '../componentes/Admin/Proyectos/FormEditProject';

export const AdminDashBoard = () => {
    return (
        <>
          <NavBarAdmin />
            <div>
                <Switch>
                    <Route exact path="/admin" component={ Admin } />
                    <Route exact path="/admin/members" component={ MembersScreen } />
                    <Route exact path="/admin/projects" component={ ProjectsScreen } />
                    <Route exact path="/admin/projects/:idProject/:params" component={ FormEditProject } />
                    <Route exact path="/admin/release" component={ ReleaseScreen } />
                    <Route exact path="/admin/galery" component={ GaleryScreen }  />
                    <Route exact path="/admin/other" component={ OtherScreen } />
                    

                    <Redirect to="/login" />
                </Switch>
            </div>
        </>
    )
}
