import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { startRegisterWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react';

import Select from 'react-select';
import { useState } from 'react';

import Swal from 'sweetalert2';

export const Registrer = () => {

  const recaptchaRef = useRef(null);

  const onChange = () => {
    if (recaptchaRef.current.getValue()) {
      console.log("Captcha Resuelto");
    }
  }

  //Funcion de registro de usuarios
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const { loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({

    name: '',
    email: '',
    password: '',
    password2: '',
    rol: ''
  });

  const { name, email, password, password2, rol } = formValues;
  var verifyEmail = ""
  const handleRegistrer = (e) => {

    e.preventDefault();
    if (isFormValid()) {
      //if (recaptchaRef.current.getValue()) {
        dispatch(startRegisterWithEmailPassword(formValues));
        
      //}
    }

  }

  //Select tipo de usuario
  const options = [
    { value: 'alumno', label: 'Alumno' },
    { value: 'externo', label: 'Externo' }
  ]

  const [state, setState] = useState({
    selectedOption: null
  })

  const handleChange = selectedOption => {
    setState({ selectedOption });
  }

  //validaciones -> esto ya estaba pero creo que ni sirve, hay que checarlo
  function isFormValid() {
    
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'))
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'))
      return false
    } else if (state.selectedOption == null) {
      dispatch(setError('Debe seleccionar un tipo de usuario'))
      return false;
    }

    //Verifica si el email que se introdujo en el formulario es de una cuenta del ipn
    //si es del ipn, alumno o cic, el rol que se asigna es alumno
    //En caso de que no coincida, se asigna un rol de externo
    const textRegexString = new RegExp("ipn.mx","i");
    verifyEmail=formValues.email;
    console.log(verifyEmail);
    if(textRegexString.test(verifyEmail)){
      console.log("Pertenece al IPN");
      formValues.rol = "alumno";
      Swal.fire({
        title: '<strong>Cuenta Creada</strong>',
        icon: 'success',
        html:
          'Su cuenta de <b><u>alumno</u></b> fue creada con exito ',
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      })
    }else{
      console.log("No pertence al IPN");
      formValues.rol = "externo";
      Swal.fire({
        title: '<strong>Cuenta Creada</strong>',
        icon: 'success',
        html:
          'Su cuenta de <b><u>externo</u></b> fue creada con exito ',
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      })
    }
    dispatch(removeError());
    return true;

  }

  return (
    <div className='container' style={{overflow:"hidden"}}>
      <div className='centro'>
        <h2> Crea tu cuenta </h2>
        <hr />
        <div>

          {
            msgError &&
            (
              <div className="auth__alert-error">
                {msgError}
              </div>
            )
          }

          <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Nombre Completo* </label>
              <input
                type='label'
                className='form-control'
                name='name'
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Email* </label>
              <input
                type='email'
                className='form-control'
                name='email'
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Tipo de usuario* </label>
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
          {/* <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Pais* </label>
              <input
                type='label'
                className='form-control'
                name='Pais'
                required
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Ocupación* </label>
              <input
                type='label'
                className='form-control'
                name='Ubicacion'
                required
              />
            </div>
          </div> */}
          <div className='row'>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Contraseña* </label>
              <input
                type='password'
                className='form-control'
                name='password'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2 col-sm-7'>
              <label className='form-label'>Confirmar Contraseña* </label>
              <input
                type='password'
                className='form-control'
                name='password2'
                required
                onChange={handleInputChange}
              />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdCNashAAAAAN53p0HWkIi1-UJa84RVyxV-nMgF"
                onChange={onChange}
              />,

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
  )
}
