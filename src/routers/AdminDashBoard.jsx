//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta de la barra de navegación del administrador
import { NavBarAdmin } from '../components/ui/NavBarAdmin';

//Uso de ruta de error
import { RutaError } from '../components/ui/RutaError';

//Uso de ruta hacia la página general (principal)
import { General } from '../components/Usuario/General';

//Uso de rutas hacia pantallas principales de cada categoría
import { GalleryScreen } from '../components/Admin/Galeria/GalleryScreen';
import { ProjectsScreen } from '../components/Admin/Proyectos/ProjectsScreen';
import { AlumnoScreen } from '../components/Admin/Alumnos/AlumnoScreen';
import { ExternoScreen } from '../components/Admin/Externos/ExternoScreen';
import { TesisScreen } from '../components/Admin/Tesis/TesisScreen';
import { ReleaseScreen } from '../components/Admin/Publicaciones/ReleaseScreen';
import { LiderScreen } from '../components/Admin/Lideres/LiderScreen';
import AvisosScreen from '../components/Admin/Avisos/AvisosScreen';
import InstitucionesScreen from '../components/Admin/Instituciones/InstitucionesScreen';
import CarrerasScreen from '../components/Admin/Carreras/CarrerasScreen';
import TechScreen from '../components/Admin/Tecnologías/TechScreen';
import YouTubeScreen from '../components/Admin/Youtube/YouTubeScreen';

//Uso de rutas hacia formularios
import { FormAddTesisGrado } from '../components/Admin/Tesis/FormAddTesisGrado';
import { FormAddTesisMaestria } from '../components/Admin/Tesis/FormAddTesisMaestria';
import { FormAddTesisDoctorado } from '../components/Admin/Tesis/FormAddTesisDoctorado';
import { FormEditProject } from '../components/Admin/Proyectos/FormEditProject';
import { FormEditarAlumno } from '../components/Admin/Alumnos/FormEditarAlumno';
import { FormAddProject } from '../components/Admin/Proyectos/FormAddProject';
import { FormAddRelease } from '../components/Admin/Publicaciones/FormAddRelease';
import { FormAddSign } from '../components/Admin/Avisos/FormAddSign';
import { FormAddAlumno } from '../components/Admin/Alumnos/FormAddAlumno';
import { FormAddLider } from '../components/Admin/Lideres/FormAddLider';
import { FormEditRelease } from '../components/Admin/Publicaciones/FormEditRelease';
import { EditInfoTesis } from '../components/Admin/Tesis/EditInfoTesis';

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
          <Route
            path="projects/:idProject/:params"
            element={<FormEditProject />}
          />
          <Route path="release" element={<ReleaseScreen />} />
          <Route path="release/agregar" element={<FormAddRelease />} />
          <Route path="alumnos" element={<AlumnoScreen />} />
          <Route path="alumnos/agregar" element={<FormAddAlumno />} />
          <Route path="externos" element={<ExternoScreen />} />
          <Route path="tesis" element={<TesisScreen />} />
          <Route path="addTesisGrado" element={<FormAddTesisGrado />} />
          <Route path="addTesisMaestria" element={<FormAddTesisMaestria />} />
          <Route path="addTesisDoctorado" element={<FormAddTesisDoctorado />} />
          <Route
            path="tesis/:idTesis/:params"
            element={<EditInfoTesis />}
            exact
          />
          <Route
            path="lideres/editar/:idAlumno"
            element={<FormEditarAlumno />}
          />
          <Route
            path="externos/editar/:idAlumno"
            element={<FormEditarAlumno />}
          />
          <Route
            path="alumnos/editar/:idAlumno"
            element={<FormEditarAlumno />}
          />
          <Route
            path="release/editPub/:idRelease"
            element={<FormEditRelease />}
          />
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
  );
};
