//Uso de React
import React from 'react';
import { useState } from 'react';

//Uso de Select
import Select from 'react-select';

//Uso de Swal para las alertas en las ejecuciones
import Swal from 'sweetalert2';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso de useParams para la navegación en el sitio
import { useParams } from 'react-router-dom';

//Uso de hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de Firestore
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

//Componentes necesarios
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { editTesisGrado, editTesisPosgrado } from '../../../actions/edit';

export const EditInfoTesis = () => {
  //Traemos la información de los usuarios de firebase
  const { usuarios } = useSelector((state) => state.user);

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Traemos la información de la tesis de firebase
  const { idTesis } = useParams();
  const { tesis } = useSelector((state) => state.tesis);
  const tesisO = tesis.filter((t) => {
    return t.id === idTesis;
  });
  const tesisObj = tesisO[0];

  //useEffect y hook para la obtención de las tecnologías6
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

  //Obtención de alumnos en tesis
  const alumnosListaInitAux = [];
  var alumnoAux = '';
  if (tesisObj.grado == 'Licenciatura') {
    for (let i = 0; i < tesisObj.alumnosLista.length; i++) {
      alumnosListaInitAux.push(tesisObj.alumnosLista[i]);
    }
  } else {
    alumnoAux = tesisObj.alumnosLista;
  }

  //Contenido del formulario de edición de tesis
  const [formValues, handleInputChange] = useForm(tesisObj);
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
    directoresLista,
    alumnosLista,
    grado,
    alumnosListaInit,
  } = formValues;

  //Función para manejar el cambio de opción de tecnología
  const [datos, setDatos] = useState('');
  const MgAFAP = (datosMg) => {
    setDatos(datosMg);
    formValues.urlImg = datos;
  };
  const selectedDirectores = [];
  const selectedAlumnos = [];

  //Checkbox para los directores
  directoresLista.map((u) => selectedDirectores.push({ value: u, label: u }));
  const optionsD = [];
  usuarios
    .filter((u) => u.esAutor === 'Y' && u.rol === 'administrador')
    .map((u) => optionsD.push({ value: u.id, label: u.nombre }));
  const optionsA = [];
  usuarios
    .filter((u) => u.esAutor === 'Y' && u.rol !== 'administrador')
    .map((u) => optionsA.push({ value: u.id, label: u.nombre }));

  //Función y hook para seleccionar a los directores
  const [change, setChange] = useState(false);
  const [directores, setDirectores] = useState({
    selectedOption: selectedDirectores,
  });
  const handleChangeDirectores = (selectedOption) => {
    setDirectores({ selectedOption });
    setChange(true);
  };

  //Checkbox para los alumnos
  if (formValues.grado == 'Licenciatura') {
    alumnosLista.map((u) => selectedAlumnos.push({ value: u, label: u }));
  } else {
    selectedAlumnos.push({ value: alumnosLista, label: alumnosLista });
  }

  //Función y hook para seleccionar a los alumnos
  const [alumnos, setAlumnos] = useState({
    selectedOption: selectedAlumnos,
  });
  const handleChangeAlumnos = (selectedOption) => {
    setAlumnos({ selectedOption });
  };

  //Función para realizar la inserción de las actualizaciones en la BD
  const handleSubmit = () => {
    if (datos != '') formValues.urlImg = datos;
    const selectedDirectores = [];
    const selectedAlumnos = [];
    if (directores.selectedOption != null && alumnos.selectedOption != null) {
      if (directores.selectedOption.length <= 2) {
        if (directores.selectedOption != null) {
          directores.selectedOption.map((u) =>
            selectedDirectores.push(u.label),
          );
        }
        if (formValues.grado == 'Licenciatura') {
          if (alumnos.selectedOption.length <= 4) {
            if (alumnos.selectedOption != null) {
              alumnos.selectedOption.map((u) => selectedAlumnos.push(u.label));
            }
            formValues.directoresLista = selectedDirectores;
            formValues.alumnosLista = selectedAlumnos;
            formValues.alumnosListaInit = alumnosListaInitAux;

            //Envio al estado la actualización de una tesis de grado
            dispatch(editTesisGrado(idTesis, formValues));
          } else {
            Swal.fire(
              'Error al agregar tesis, sólo se admiten máximo 4 alumnos',
            );
          }
        } else {
          formValues.directoresLista = selectedDirectores;
          formValues.alumnosLista = {};
          if (change) formValues.alumnosLista = alumnos.selectedOption[0].label;
          else {
            formValues.alumnosLista = alumnos.selectedOption.label;
          }
          formValues.alumnosListaInit = alumnoAux;

          //Envio al estado la actualización de una tesis de posgrado
          dispatch(editTesisPosgrado(idTesis, formValues));
        }
      } else {
        Swal.fire(
          'Error al agregar tesis, sólo se admiten máximo 2 Directores',
        );
      }
    } else {
      Swal.fire(
        'Error al agregar tesis,',
        'Debe tener al menos un director/asesor y un alumno agregado',
        'error',
      );
    }
  };

  //Despliegue del formulario para editar la información de las tesis
  return (
    <div className="container">
      <div className="app-title">
        <h2>Editar Tesis </h2>
        <hr />
      </div>
      <div className="col mb-3">
        <label> Grado: {formValues.grado} </label>
      </div>
      <div className="form-group row">
        <div className="col mb-3">
          <label> Nombre del proyecto </label>
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
          <label> Tecnología utilizada </label>
          <select
            className="form-control"
            name="nameTech"
            value={nameTech}
            onChange={handleInputChange}
          >
            <option key="vacio" value="vacio">
              {' '}
              No se ha seleccionado ninguna opcion{' '}
            </option>
            {techOption.map((item) => (
              <option key={item.id} value={item.id}>
                {' '}
                {item.nombre}{' '}
              </option>
            ))}
          </select>
        </div>
        <div className="col mb-3">
          <label>Status del proyecto</label>
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
        {grado === 'Licenciatura' ? (
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
        ) : (
          <div className="col mb-3">
            <label>Agregar asesores</label>
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
        )}
        {grado === 'Licenciatura' ? (
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
        ) : (
          <div className="col mb-3">
            <label>Agregar alumno</label>
            <Select
              name="alumno"
              options={optionsA}
              className="basic-single"
              classNamePrefix="select"
              value={alumnos.selectedOption}
              onChange={handleChangeAlumnos}
            />
          </div>
        )}
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
            <option value="Si"> Si </option>
            <option value="No"> No </option>
          </select>
        </div>
        <div className="col mb-3">
          <label>Liga del video</label>
          <input
            className="form-control"
            type="text"
            name="url"
            placeholder="URL"
            value={url}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div class="text-center">
        <button className="btn btn-primary btn-large" onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
};
