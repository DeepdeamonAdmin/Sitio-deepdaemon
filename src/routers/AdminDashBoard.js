import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GalleryScreen } from '../componentes/Admin/Galeria/GalleryScreen';
import { MembersScreen } from '../componentes/Admin/Miembros/MembersScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { AlumnoScreen } from '../componentes/Admin/Alumnos/AlumnoScreen';
import { ExternoScreen} from '../componentes/Admin/Externos/ExternoScreen'
import { TesisScreen } from '../componentes/Admin/Tesis/TesisScreen';
import { FormAddTesis } from '../componentes/Admin/Tesis/FormAddTesis';
import { EditInfoTesis } from '../componentes/Admin/Tesis/EditInfoTesis';
import { ReleaseScreen } from '../componentes/Admin/Publcaciones/ReleaseScreen';
import { LiderScreen } from '../componentes/Admin/Lideres/LiderScreen';
import { NavBarAdmin } from '../componentes/ui/NavBarAdmin';
import { FormEditProject } from '../componentes/Admin/Proyectos/FormEditProject';
import { FormEditarAlumno } from '../componentes/Admin/Alumnos/FormEditarAlumno';
import { RutaError } from '../componentes/ui/RutaError';
import AvisosScreen from '../componentes/Admin/Avisos/AvisosScreen';
import InstitucionesScreen from '../componentes/Admin/Instituciones/InstitucionesScreen';
import CarrerasScreen from '../componentes/Admin/Carreras/CarrerasScreen';
import TechScreen from '../componentes/Admin/Tecnologías/TechScreen';
import FormEditLider from '../componentes/Admin/Lideres/FormEditLider';
import { FormAddProject } from '../componentes/Admin/Proyectos/FormAddProject';
import { General } from '../componentes/Usuario/General'
import { FormAddRelease } from '../componentes/Admin/Publcaciones/FormAddRelease';


export const AdminDashBoard = () => {
	return (
		<>
			<NavBarAdmin />
			<div>
				<Routes>
					<Route path="/" element={<General />} />
					<Route path="members" element={<MembersScreen />} />
					<Route path="projects" element={<ProjectsScreen />} />
					<Route path="projects/agregar" element={<FormAddProject />} />
					<Route path="projects/:idProject/:params" element={<FormEditProject />} />
					<Route path="release" element={<ReleaseScreen />} />
					<Route path="alumnos" element={<AlumnoScreen />} />
					<Route path="externos" element={<ExternoScreen />} />
					<Route path="tesis" element={<TesisScreen />} />
					<Route path='addTesis' element={ <FormAddTesis /> } />
					<Route path='tesis/:idTesis/:params' element={ <EditInfoTesis /> } exact/>
					<Route path="alumnos/editar/:idAlumno" element={<FormEditarAlumno />} />
					<Route path="externos/editar/:idAlumno" element={<FormEditarAlumno />} />
					{/* TODO: Hay que hacer el formulario de editar publicación o reutilizarlo */}
					<Route path="release/editPub/:idRelease" element={<FormAddRelease/>} />
					<Route path="lideres" element={<LiderScreen />} />
					<Route path="lideres/editar/:idLider" element={<FormEditLider />} />
					<Route path="galery" element={<GalleryScreen />} />
					<Route path="avisos" element={<AvisosScreen />} />
					{/* <Route path="other" element={<OtherScreen />} /> */}
					<Route path="Instituciones" element={<InstitucionesScreen />} />
					<Route path="Carreras" element={<CarrerasScreen />} />
					<Route path="Tecnologias" element={<TechScreen />} />

					<Route path="*" element={<RutaError />} />
				</Routes>
			</div>
		</>
	)
}
