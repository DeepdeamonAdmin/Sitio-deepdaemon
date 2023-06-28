import React, { useEffect } from 'react'
import '../../users/users.css'
import fotoPerfil from '../../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../../actions/user';
import { useForm } from '../../../hooks/useForm';
import validator from 'validator';
import { ModalGalleryAddLideres } from './ModalGalleryAddLideres';
import { FotosGalleryChoose } from '../../ui/FotosGalleryChoose';
import { registrarLider } from '../../../actions/auth';
import { removeError, setError } from '../../../actions/ui';
import { useState } from 'react';

//importar todas las imagenes de la galeria
import azul from "../../../assets/azul.jpg";
import verde from "../../../assets/verde.jpg";

export const FormAddLider = () => {

  //Funcion de registro de usuarios
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const { loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({

    name: '',
    email: '',
    password: '',
    password2: '',
    display: 'Y',
    urlImg: '',
    esAutor: 'Y'
  });

  const { name, email, password, password2, display, esAutor, urlImg } = formValues;

  const handleRegistrer = (e) => {

    e.preventDefault();
    if (isFormValid()) {
      formValues.urlImg = datos;
      dispatch(registrarLider(formValues));
    }

  }
  //Galeria
  const [datos, setDatos] = useState('');
  const MgAFAP = (datosMg) => {
    setDatos(datosMg);
  }

  const isFormValid = () => {

    if (name.trim().length === 0) {
      dispatch(setError('Name is required'))
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'))
      return false
    }

    dispatch(removeError());

    return true;

  }

  return (
    <div className='container'>
      <div className='centro'>
        <h2> Registrar Lider </h2>
        <hr />
        <form onSubmit={handleRegistrer}>

          {
            msgError &&
            (
              <div className="auth__alert-error">
                {msgError}
              </div>
            )
          }

          <div className='row'>
            <div className='mb-2 col-sm-6'>
              <label className='form-label'>Nombre Completo* </label>
              <input
                type='label'
                className='form-control'
                name='name'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2 col-sm-6'>
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
            <div className='mb-2 col-sm-6'>
              <label className='form-label'>Contraseña* </label>
              <input
                type='password'
                className='form-control'
                name='password'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2 col-sm-6'>
              <label className='form-label'>Confirmar Contraseña* </label>
              <input
                type='password'
                className='form-control'
                name='password2'
                required
                onChange={handleInputChange}
              />
            </div>

            <div className='row'>
              {/* <div className='mb-2 col-sm-6'>
            <label className="form-label">Seleccionar una foto de la galeria</label>
            <input type="file" className="form-control" name="fotoPerfil" onChange={ handleInputChange } />
            <img src={ fotoPerfil } alt="fotoPerfil" className="img-fluid" />
          </div> */}
              <div className="col-md-3 mb-3">
                <label> Imagen desde Galeria </label>
                <div className="card">
                  <img className='foto' src={urlImg || datos} alt="Imagen" />
                  <ModalGalleryAddLideres MgAFAP={MgAFAP} />
                  <FotosGalleryChoose />
                </div>
              </div>
              <div className="col mb-3">
                <label>Mostrar en página principal</label>
                <select
                  className="form-control"
                  name='display'
                  value={display}
                  onChange={handleInputChange}
                >
                  <option value='Y' > Si </option>
                  <option value='N' > No </option>
                </select>
              </div>
              <div className="col mb-3">
                <label>Considerar para ser autor</label>
                <select
                  className="form-control"
                  name='esAutor'
                  value={esAutor}
                  onChange={handleInputChange}
                >
                  <option value='Y' > Si </option>
                  <option value='N' > No </option>
                </select>
              </div>

            </div>
            <div class="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-registro"
                disabled={loading}
              >
                Registrar
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
