//Uso de React
import React from 'react';
import { useState } from 'react';

//Uso de Firestore
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

//Uso de Redux
import { useDispatch } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de useNavigate para la navegación en el sitio
import { useNavigate } from 'react-router-dom';

//Componentes necesarios
import { registroDesdeLider } from '../../../actions/auth';
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGallery } from '../../ui/FotosGallery';

export const FormAddAlumno = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Declaración del useNavigate
  const navigate = useNavigate();

  //Contenido del formulario de adición de un estudiante
  const [formValues, handleInputChange, reset] = useForm({
    nombre: '',
    password: '',
    linkedin: '',
    facebook: '',
    github: '',
    email: '',
    descripcion: '',
    grado: 'current',
    urlImg: '',
    nivel: '',
    start: '',
    end: '',
    idSchool: '',
    idCareer: '',
    esAutor: 'Y',
    display: 'Y',
    idWork: 'student',
    rol: 'alumno',
  });
  const {
    nombre,
    email,
    urlImg,
    grado,
    descripcion,
    idSchool,
    idCareer,
    facebook,
    github,
    linkedin,
    nivel,
    start,
    end,
    password,
    rol,
    esAutor,
    display,
  } = formValues;

  //Función para insertar en usuairo en la BD
  const handleSubmit = () => {
    //Envio al estado el registro del alumno desde el lider
    dispatch(registroDesdeLider(formValues));
    reset();
    navigate('/admin/alumnos');
  };

  //Configuración del hook useState para la selección de escuela
  const [escuela, setEscuela] = React.useState([]);

  //Configuración del hook useState para la selección de carrera
  const [carrera, setCarrera] = React.useState([]);

  //useEffect para cargar los datos de la carrera y de la escuela
  React.useEffect(() => {
    const obtenerCarrera = async () => {
      try {
        const Data = await getDocs(collection(db, 'Carrera'));
        const arrayData = Data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarrera(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    const obtenerEscuela = async () => {
      try {
        const Data = await getDocs(collection(db, 'Escuela'));
        const arrayData = Data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEscuela(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCarrera();
    obtenerEscuela();
  }, []);

  //Función y hook para obtener la imagen
  const [datos, setDatos] = useState('');
  const MgAFAP = (datosMg) => {
    setDatos(datosMg);
    formValues.urlImg = datosMg;
  };

  //Despliegue del formulario para añadir un alumno
  return (
    <div className="container">
      <div className="app-title">
        <h2>Agregar Alumno</h2>
        <hr />
      </div>
      <div className="row">
        <div className="col mb-3">
          <label> Nombre* </label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            required
            placeholder="Name"
            value={nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Contraseña* </label>
          <input
            className="form-control"
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label> Email* </label>
          <input
            className="form-control"
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Grado </label>
          <select
            className="form-control"
            name="grado"
            value={grado}
            onChange={handleInputChange}
          >
            <option value="current" selected>
              {' '}
              Current{' '}
            </option>
            <option value="graduate"> Graduate </option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            rows="3"
            cols="40"
            name="descripcion"
            placeholder="Desciption"
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-2 ">
          <label>Nivel</label>
          <select
            className="form-control"
            name="nivel"
            value={nivel}
            onChange={handleInputChange}
          >
            <option value="vacio">
              {' '}
              No se ha seleccionado ninguna opcion{' '}
            </option>
            <option value="bachelor" selected>
              {' '}
              Bachelor{' '}
            </option>
            <option value="masters"> Masters </option>
            <option value="phd"> PHD </option>
            <option value="work"> Work </option>
          </select>
        </div>
        <div className="col mb-2">
          <label> Escuela </label>
          <select
            className="form-control"
            name="idSchool"
            value={idSchool}
            onChange={handleInputChange}
          >
            <option key="vacio" value="vacio">
              {' '}
              No se ha seleccionado ninguna opcion{' '}
            </option>
            {escuela.map((item) => (
              <option key={item.id} value={item.id}>
                {' '}
                {item.name}{' '}
              </option>
            ))}
          </select>
        </div>
        <div className="col mb-2">
          <label> Carrera </label>
          <select
            className="form-control"
            name="idCareer"
            value={idCareer}
            onChange={handleInputChange}
          >
            <option key="vacio" value="vacio">
              {' '}
              No se ha seleccionado ninguna opcion{' '}
            </option>
            {carrera.map((item) => (
              <option key={item.id} value={item.name}>
                {' '}
                {item.name}{' '}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label> Linkedin </label>
          <input
            className="form-control"
            type="url"
            name="linkedin"
            placeholder="Linkedin"
            value={linkedin}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Github </label>
          <input
            className="form-control"
            type="url"
            name="github"
            placeholder="Github"
            value={github}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-3">
          <label> Facebook </label>
          <input
            className="form-control"
            type="url"
            name="facebook"
            placeholder="Facebook"
            value={facebook}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-5">
          <label> Fecha de Inicio </label>
          <input
            className="form-control"
            type="date"
            min="1900-01-01"
            name="start"
            value={start}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 mb-5">
          <label> Fecha de Termino </label>
          <input
            className="form-control"
            type="date"
            max="2030-01-01"
            name="end"
            value={end}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <label> Imagen desde Galeria </label>
          <div className="card">
            <img className="foto" src={urlImg} alt="Imagen" />
            <ModalGalleryAdd MgAFAP={MgAFAP} />
            <FotosGallery />
          </div>
        </div>
        <div className="col mb-3">
          <label>Mostrar en página principal</label>
          <select
            className="form-control"
            name="display"
            value={display}
            onChange={handleInputChange}
          >
            <option value="Y"> Si </option>
            <option value="N"> No </option>
          </select>
        </div>
        <div className="col mb-3">
          <label>Considerar para ser autor</label>
          <select
            className="form-control"
            name="esAutor"
            value={esAutor}
            onChange={handleInputChange}
          >
            <option value="Y"> Si </option>
            <option value="N"> No </option>
          </select>
        </div>
        <div className="col mb-3">
          <label>Tipo de usuario</label>
          <select
            className="form-control"
            name="rol"
            value={rol}
            onChange={handleInputChange}
          >
            <option value="alumno"> Alumno </option>
          </select>
        </div>
      </div>
      <div class="text-center">
        <button
          className="btn btn-primary btn-lg mb-5"
          type="submit"
          onClick={handleSubmit}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};
