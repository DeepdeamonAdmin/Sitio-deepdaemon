import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../componentes/Admin/Admin';
import { GalleryScreen } from '../componentes/Admin/Galeria/GalleryScreen';
import { MembersScreen } from '../componentes/Admin/Miembros/MembersScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { AlumnoScreen } from '../componentes/Admin/Alumnos/AlumnoScreen';
import { ReleaseScreen } from '../componentes/Admin/Publcaciones/ReleaseScreen';
import { LiderScreen } from '../componentes/Admin/Lideres/LiderScreen';
import { OtherScreen } from '../componentes/Admin/Other/OtherScreen';
import { NavBarAdmin } from '../componentes/ui/NavBarAdmin';
import { FormEditProject } from '../componentes/Admin/Proyectos/FormEditProject';
import { RutaError } from '../componentes/ui/RutaError';
import AvisosScreen from '../componentes/Admin/Avisos/AvisosScreen';

export const AdminDashBoard = () => {
	return (
		<>
			<NavBarAdmin />
			<div>
				<Routes>
					<Route path="/" element={<Admin />} />
					<Route path="members" element={<MembersScreen />} />
					<Route path="projects" element={<ProjectsScreen />} />
					<Route path="projects/:idProject/:params" element={<FormEditProject />} />
					<Route path="release" element={<ReleaseScreen />} />
					<Route path="alumnos" element={<AlumnoScreen />} />
					<Route path="lideres" element={<LiderScreen />} />
					<Route path="galery" element={<GalleryScreen />} />
					<Route path="avisos" element={<AvisosScreen />} />
					<Route path="other" element={<OtherScreen />} />


					<Route path="*" element={<RutaError />} />
				</Routes>
			</div>
		</>
	)
}
