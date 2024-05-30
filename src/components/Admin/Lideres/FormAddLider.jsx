//Uso de React
import { useState } from 'react';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso de useNavigate para la navegación en el sitio
import { useNavigate } from 'react-router-dom';

//Uso del hook useForm
import { useForm } from '../../../hooks/useForm';

//Uso de CSS
import '../../Alumno/users.css';

//Componentes necesarios
import validator from 'validator';
import { ModalGalleryAdd } from '../Galeria/ModalGalleryAdd';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { registrarLider } from '../../../actions/auth';
import { removeError, setError } from '../../../actions/ui';

export const FormAddLider = () => {
  //Declaración del dispatch
  const dispatch = useDispatch();

  //Declaración del useNavigate
  const navigate = useNavigate();

  //Obtención del mensaje de error del estado
  const { msgError } = useSelector((state) => state.ui);

  //Obtención del estado de carga del estado
  const { loading } = useSelector((state) => state.ui);

  //Contenido del formulario de registro de lider
  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
    display: 'Y',
    urlImg: '',
    esAutor: 'Y',
    idWork: '',
  });
  const { name, email, password, password2, display, esAutor, idWork, urlImg } =
    formValues;

  //función para manejar el registro
  const handleRegistrer = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      formValues.urlImg = datos;

      //Envio al estado el registro del lider
      dispatch(registrarLider(formValues));

      reset();
      navigate('/admin/lideres');
    }
  };
  //Obtención de la galería
  const [datos, setDatos] = useState('');
  const MgAFAP = (datosMg) => {
    setDatos(datosMg);
  };

  //Función para verificar si el registro de un lider es correcto
  const isFormValid = () => {
    if (name.trim().length === 0) {
      //Envio al estado del error de nombre requerido
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      //Envio al estado del error de email no valido
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      //Envio al estado del error de contraseña inválida
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other',
        ),
      );
      return false;
    }

    //Envio al estado la eliminación del error
    dispatch(removeError());
    return true;
  };

  //Despliegue del formulario para el registro de un lider
  return (
    <div className="container">
      <div className="centro">
        <h2> Registrar Lider </h2>
        <hr />
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <div className="row">
          <div className="mb-2 col-sm-6">
            <label className="form-label">Nombre Completo* </label>
            <input
              type="label"
              className="form-control"
              name="name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 col-sm-6">
            <label className="form-label">Email* </label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-2 col-sm-6">
            <label className="form-label">Contraseña* </label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 col-sm-6">
            <label className="form-label">Confirmar Contraseña* </label>
            <input
              type="password"
              className="form-control"
              name="password2"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
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
              <label>Seleccionar atributo</label>
              <select
                className="form-control"
                name="idWork"
                value={idWork}
                onChange={handleInputChange}
              >
                <option value="leader"> Lider </option>
                <option value="colaborator"> Colaborador </option>
              </select>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-registro"
              disabled={loading}
              onClick={handleRegistrer}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
