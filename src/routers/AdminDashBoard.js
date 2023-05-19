import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GalleryScreen } from '../componentes/Admin/Galeria/GalleryScreen';
import { MembersScreen } from '../componentes/Admin/Miembros/MembersScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { AlumnoScreen } from '../componentes/Admin/Alumnos/AlumnoScreen';
import { ExternoScreen} from '../componentes/Admin/Externos/ExternoScreen'
import { TesisScreen } from '../componentes/Admin/Tesis/TesisScreen';
import { FormAddTesisGrado } from '../componentes/Admin/Tesis/FormAddTesisGrado';
import { FormAddTesisMaestria } from '../componentes/Admin/Tesis/FormAddTesisMaestria';
import { FormAddTesisDoctorado } from '../componentes/Admin/Tesis/FormAddTesisDoctorado';
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
import { FormAddSign } from '../componentes/Admin/Avisos/FormAddSign';
import { FormAddAlumno } from '../componentes/Admin/Alumnos/FormAddAlumno';
import { FormAddLider } from '../componentes/Admin/Lideres/FormAddLider';


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
					<Route path="release/agregar" element={<FormAddRelease />} />
					<Route path="alumnos" element={<AlumnoScreen />} />
					<Route path="alumnos/agregar" element={<FormAddAlumno />} />
					<Route path="externos" element={<ExternoScreen />} />
					<Route path="tesis" element={<TesisScreen />} />
					<Route path='addTesisGrado' element={ <FormAddTesisGrado/> } />
					<Route path='addTesisMaestria' element={ <FormAddTesisMaestria/> } />
					<Route path='addTesisDoctorado' element={ <FormAddTesisDoctorado/> } />
					<Route path='tesis/:idTesis/:params' element={ <EditInfoTesis /> } exact/>
					<Route path="lideres/editar/:idAlumno" element={<FormEditarAlumno />} />
					<Route path="externos/editar/:idAlumno" element={<FormEditarAlumno />} />
					<Route path="alumnos/editar/:idAlumno" element={<FormEditarAlumno />} />
					{/* TODO: Hay que hacer el formulario de editar publicación o reutilizarlo */}
					<Route path="release/editPub/:idRelease" element={<FormAddRelease/>} />
					<Route path="lideres" element={<LiderScreen />} />
					<Route path="lideres/agregar" element={<FormAddLider />} />
					{/*Se reutilizó el formuladrio de editar alumno para el lider*/}
					{/*<Route path="lideres/editar/:idLider" element={<FormEditLider />} />*/}
					<Route path="galery" element={<GalleryScreen />} />
					<Route path="avisos" element={<AvisosScreen />} />
					<Route path="avisos/agregar" element={<FormAddSign />} />
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
