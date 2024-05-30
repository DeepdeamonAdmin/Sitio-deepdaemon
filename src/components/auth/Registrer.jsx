//Uso de React
import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import { useRef } from 'react';

//Uso de Validator
import validator from 'validator';

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso del hook useForm
import { useForm } from '../../hooks/useForm';

//Uso de ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

//Uso de Swal para las alertas en las ejecuciones del sistema
import Swal from 'sweetalert2';

//Componentes necesarios
import { startRegisterWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

export const Registrer = () => {
  //Declaración del ReCAPTCHA
  const recaptchaRef = useRef(null);

  //Función del ReCAPTCHA
  const onChange = () => {
    if (recaptchaRef.current.getValue()) {
      console.log('Captcha Resuelto');
    }
  };

  //Declaración del dispatch
  const dispatch = useDispatch();

  //Obtención del estado el mensaje de error y la craga
  const { msgError } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.ui);

  //Contenido del formulario para el registro
  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
    rol: '',
  });
  const { name, email, password, password2, rol } = formValues;

  //VAriable para la verificación del correo
  var verifyEmail = '';

  //Función para manejar el registro
  const handleRegistrer = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      //Enviar al estado el registro con los datos del formulario
      dispatch(startRegisterWithEmailPassword(formValues));
    }
  };

  //Seleccionar tipo de usuario
  const options = [
    { value: 'alumno', label: 'Alumno' },
    { value: 'externo', label: 'Externo' },
  ];

  //Hook useState para la selección del tipo de usuario
  const [state, setState] = useState({
    selectedOption: null,
  });

  //Función para manejar el cambio en el tipo de usuario
  const handleChange = (selectedOption) => {
    setState({ selectedOption });
  };

  //Validaciones del formulario
  function isFormValid() {
    if (name.trim().length === 0) {
      //Envio al estado error sobre nombre requerido
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      //Envio al estado error sobre email no válido
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      //Envio al estado error sobre la contraseña no cumple con las especificaciones
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other',
        ),
      );
      return false;
    } else if (state.selectedOption == null) {
      //Envio al estado error sobre seleccionar tipo de usuario
      dispatch(setError('Debe seleccionar un tipo de usuario'));
      return false;
    }

    //Verifica si el email que se introdujo en el formulario es de una cuenta del ipn
    //si es del ipn, alumno o cic, el rol que se asigna es alumno
    //En caso de que no coincida, se asigna un rol de externo
    const textRegexString = new RegExp('ipn.mx', 'i');
    verifyEmail = formValues.email;
    console.log(verifyEmail);
    if (textRegexString.test(verifyEmail)) {
      console.log('Pertenece al IPN');
      formValues.rol = 'alumno';
      Swal.fire({
        title: '<strong>Cuenta Creada</strong>',
        icon: 'success',
        html: 'Su cuenta de <b><u>alumno</u></b> fue creada con exito ',
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      });
    } else {
      console.log('No pertence al IPN');
      formValues.rol = 'externo';
      Swal.fire({
        title: '<strong>Cuenta Creada</strong>',
        icon: 'success',
        html: 'Su cuenta de <b><u>externo</u></b> fue creada con exito ',
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      });
    }

    //Enviar al estado la eliminación del error
    dispatch(removeError());
    return true;
  }

  //Despliegue del formulario de registro
  return (
    <div className="container" style={{ overflow: 'hidden' }}>
      <div className="centro">
        <h2> Crea tu cuenta </h2>
        <hr />
        <div>
          {msgError && <div className="auth__alert-error">{msgError}</div>}

          <div className="row">
            <div className="mb-2 col-sm-7">
              <label className="form-label">Nombre Completo* </label>
              <input
                type="label"
                className="form-control"
                name="name"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col-sm-7">
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
            <div className="mb-2 col-sm-7">
              <label className="form-label">Tipo de usuario* </label>
              <Select
                name="rol"
                options={options}
                className="form-control"
                classNamePrefix="select"
                isClearable={false}
                value={state.selectedOption}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col-sm-7">
              <label className="form-label">Contraseña* </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2 col-sm-7">
              <label className="form-label">Confirmar Contraseña* </label>
              <input
                type="password"
                className="form-control"
                name="password2"
                required
                onChange={handleInputChange}
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdCNashAAAAAN53p0HWkIi1-UJa84RVyxV-nMgF"
                onChange={onChange}
              />
              ,
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
    </div>
  );
};
