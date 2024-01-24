//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta de la barra de navegación del administrador
import { NavBarAdmin } from '../componentes/ui/NavBarAdmin';

//Uso de ruta de error
import { RutaError } from '../componentes/ui/RutaError';

//Uso de ruta hacia la página general (principal)
import { General } from '../componentes/Usuario/General'

//Uso de rutas hacia pantallas principales de cada categoría
import { GalleryScreen } from '../componentes/Admin/Galeria/GalleryScreen';
import { ProjectsScreen } from '../componentes/Admin/Proyectos/ProjectsScreen';
import { AlumnoScreen } from '../componentes/Admin/Alumnos/AlumnoScreen';
import { ExternoScreen} from '../componentes/Admin/Externos/ExternoScreen'
import { TesisScreen } from '../componentes/Admin/Tesis/TesisScreen';
import { ReleaseScreen } from '../componentes/Admin/Publicaciones/ReleaseScreen';
import { LiderScreen } from '../componentes/Admin/Lideres/LiderScreen';
import AvisosScreen from '../componentes/Admin/Avisos/AvisosScreen';
import InstitucionesScreen from '../componentes/Admin/Instituciones/InstitucionesScreen';
import CarrerasScreen from '../componentes/Admin/Carreras/CarrerasScreen';
import TechScreen from '../componentes/Admin/Tecnologías/TechScreen';
import YouTubeScreen from '../componentes/Admin/Youtube/YouTubeScreen';

//Uso de rutas hacia formularios
import { FormAddTesisGrado } from '../componentes/Admin/Tesis/FormAddTesisGrado';
import { FormAddTesisMaestria } from '../componentes/Admin/Tesis/FormAddTesisMaestria';
import { FormAddTesisDoctorado } from '../componentes/Admin/Tesis/FormAddTesisDoctorado';
import { FormEditProject } from '../componentes/Admin/Proyectos/FormEditProject';
import { FormEditarAlumno } from '../componentes/Admin/Alumnos/FormEditarAlumno';
import { FormAddProject } from '../componentes/Admin/Proyectos/FormAddProject';
import { FormAddRelease } from '../componentes/Admin/Publicaciones/FormAddRelease';
import { FormAddSign } from '../componentes/Admin/Avisos/FormAddSign';
import { FormAddAlumno } from '../componentes/Admin/Alumnos/FormAddAlumno';
import { FormAddLider } from '../componentes/Admin/Lideres/FormAddLider';
import { FormEditRelease } from '../componentes/Admin/Publicaciones/FormEditRelease';
import { EditInfoTesis } from '../componentes/Admin/Tesis/EditInfoTesis';

export const AdminDashBoard = () => {

	//Redirección de rutas hacia los componentes.
	return (
		<>
			<NavBarAdmin />
			<div>
				<Routes>
					<Route path="" element={<General />} />
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
					<Route path="release/editPub/:idRelease" element={<FormEditRelease/>} />
					<Route path="lideres" element={<LiderScreen />} />
					<Route path="lideres/agregar" element={<FormAddLider />} />
					<Route path="galery" element={<GalleryScreen />} />
					<Route path="avisos" element={<AvisosScreen />} />
					<Route path="avisos/agregar" element={<FormAddSign />} />
					<Route path="Instituciones" element={<InstitucionesScreen />} />
					<Route path="Carreras" element={<CarrerasScreen />} />
					<Route path="Tecnologias" element={<TechScreen />} />
					<Route path="YouTube" element={<YouTubeScreen />} />
					<Route path="*" element={<RutaError />} />
				</Routes>
			</div>
		</>
	)
}
