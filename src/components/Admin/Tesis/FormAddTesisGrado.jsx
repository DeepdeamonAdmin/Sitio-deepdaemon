//Uso de React
import React from 'react';
import { useState } from 'react';

//Uso de Select
import Select from 'react-select';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Uso de useNavigate para la navegación en el sitio
import { useNavigate } from 'react-router-dom';

//Uso de Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de Firestore
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

//Componentes necesarios
import { startNewTesisGrado } from '../../../actions/tesis';
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';

export const FormAddTesisGrado = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();
  const auth = getAuth();
  const dN = auth.currentUser.displayName;

  //Declaración del useNavigate
  const navigate = useNavigate();

  //Traemos la información de los usuarios de firebase
  const { usuarios } = useSelector((state) => state.user);

  //Contenido del formulario
  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    correo: '',
    descripcion: '',
    results: '',
    nameTech: '',
    urlImg: '',
    estado: 'indevelop',
    display: 'Yes',
    url: '',
    publisher: dN,
    directoresLista: '',
    alumnosLista: '',
    grado: 'Licenciatura',
  });
  const {
    name,
    correo,
    descripcion,
    results,
    nameTech,
    urlImg,
    estado,
    display,
    url,
    publisher,
    directoresLista,
    alumnosLista,
    grado,
  } = formValues;

  //Obtención de la galería
  const [datos, setDatos] = useState('');
  const MgAFAP = (datosMg) => {
    setDatos(datosMg);
  };

  //useEffect y hook para la obtención de las tecnologías
  const [techOption, setTech] = React.useState([]);
  React.useEffect(() => {
    const obtenerTech = async () => {
      try {
        const Data = await getDocs(collection(db, 'Tecnologias'));
        const arrayData = Data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTech(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTech();
  }, []);

  //Configuración de las tecnologías
  const techoptions = [];
  techOption.map((item) =>
    techoptions.push({ value: item.id, label: item.nombre }),
  );
  const [tecnos, setTecnos] = useState({
    selectedOption: null,
  });

  //Función para la selección de tecnologías
  const handleChangeTecnos = (selectedOption) => {
    setTecnos({ selectedOption });
  };

  //Checkbox para los directores
  const optionsD = [];
  usuarios
    .filter((u) => u.esAutor === 'Y' && u.rol === 'administrador')
    .map((u) => optionsD.push({ value: u.id, label: u.nombre }));
  const optionsA = [];
  usuarios
    .filter((u) => u.esAutor === 'Y' && u.rol !== 'administrador')
    .map((u) => optionsA.push({ value: u.id, label: u.nombre }));
  const [directores, setDirectores] = useState({
    selectedOption: null,
  });

  //Función para la selección de los directores
  const handleChangeDirectores = (selectedOption) => {
    setDirectores({ selectedOption });
  };

  //Checkbox para los alumnos
  const [alumnos, setAlumnos] = useState({
    selectedOption: null,
  });

  //Función para la selección de los alumnos
  const handleChangeAlumnos = (selectedOption) => {
    setAlumnos({ selectedOption });
  };

  //Función para la inserción de la tesis en la BD
  const handleEnvTesis = () => {
    const selectedDirectores = [];
    const selectedAlumnos = [];
    const selectedTecnos = [];
    if (directores.selectedOption != null && alumnos.selectedOption != null) {
      if (directores.selectedOption.length <= 2) {
        if (directores.selectedOption != null) {
          directores.selectedOption.map((u) =>
            selectedDirectores.push(u.label),
          );
        }
        if (alumnos.selectedOption.length <= 4) {
          if (alumnos.selectedOption != null) {
            alumnos.selectedOption.map((u) => selectedAlumnos.push(u.label));
          }
          if (tecnos.selectedOption != null) {
            tecnos.selectedOption.map((u) => selectedTecnos.push(u.label));
          }
          formValues.directoresLista = selectedDirectores;
          formValues.alumnosLista = selectedAlumnos;
          formValues.nameTech = selectedTecnos;
          formValues.urlImg = datos;

          //Envio al estado de una nueva tesis de grado
          dispatch(startNewTesisGrado(formValues));
          reset();
          navigate('/admin/Tesis');
        } else {
          Swal.fire(
            'Error al agregar tesis',
            'Sólo se admiten máximo 4 alumnos',
            'error',
          );
        }
      } else {
        Swal.fire(
          'Error al agregar tesis',
          'Sólo se admiten máximo 2 Directores',
          'error',
        );
      }
    } else {
      Swal.fire(
        'Error al agregar tesis,',
        'Debe tener al menos un director y un alumno agregado',
        'error',
      );
    }
  };

  //Despliegue del formulario para añadir una tesis de grado
  return (
    <div className="container">
      <div className="app-title">
        <h2>Agregar Tesis Licenciatura</h2>
        <hr />
      </div>
      <div className="form-group row">
        <div className="col mb-3">
          <label> Nombre de tesis </label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Contacto</label>
          <input
            className="form-control"
            type="text"
            name="correo"
            placeholder="Correo electrónico"
            value={correo}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col mb-2">
          <label>Tecnología utilizada</label>
          <Select
            isMulti
            name="nameTech"
            options={techoptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={tecnos.selectedOption}
            onChange={handleChangeTecnos}
          />
        </div>
        <div className="col mb-3">
          <label>Status de la tesis </label>
          <select
            className="form-control"
            name="estado"
            value={estado}
            onChange={handleInputChange}
          >
            <option value="registered"> Registered </option>
            <option value="indevelop"> Indevelop </option>
            <option value="completed"> Completed </option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            rows="6"
            cols="40"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Resultados </label>
          <textarea
            className="form-control"
            rows="6"
            name="results"
            value={results}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col mb-3">
          <label>Agregar Directores</label>
          <Select
            isMulti
            name="directores"
            options={optionsD}
            className="basic-multi-select"
            classNamePrefix="select"
            value={directores.selectedOption}
            onChange={handleChangeDirectores}
          />
        </div>
        <div className="col mb-3">
          <label>Agregar alumnos</label>
          <Select
            isMulti
            name="alumnos"
            options={optionsA}
            className="basic-multi-select"
            classNamePrefix="select"
            value={alumnos.selectedOption}
            onChange={handleChangeAlumnos}
          />
        </div>
      </div>
      <div className="row mb-12">
        <div className="col-md-3 mb-3">
          <label> Imagen desde Galeria </label>
          <div className="card">
            <img className="foto" src={urlImg || datos} alt="Imagen" />
            <ModalGalleryAdd MgAFAP={MgAFAP} />
            <FotosGalleryChoose />
          </div>
        </div>
        <div className="col mb-3">
          <label>Mostrar en página principal</label>
          <select
            className="form-control col-md-1 mb-3"
            name="display"
            value={display}
            onChange={handleInputChange}
          >
            <option value="Yes"> Si </option>
            <option value="No"> No </option>
          </select>
        </div>
        <div className="col mb-3">
          <label>Liga del video</label>
          <input
            className="form-control"
            type="text"
            name="url"
            placeholder="URL de video"
            value={url}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div class="text-center">
        <button className="btn btn-primary btn-large" onClick={handleEnvTesis}>
          Agregar
        </button>
      </div>
    </div>
  );
};
