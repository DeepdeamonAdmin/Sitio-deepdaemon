import React, { useEffect } from 'react'
import '../../users/users.css'
import fotoPerfil from '../../../assets/Usuario.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { activeData, startSaveData, startUploading } from '../../../actions/user';
import { useForm } from '../../../hooks/useForm';

import validator from 'validator';

import { startRegisterWithEmailPassword } from '../../../actions/auth';
import { removeError, setError } from '../../../actions/ui';

export const RegAlumn = () => {

//Funcion de registro de usuarios
const dispatch = useDispatch();
const { msgError } = useSelector( state => state.ui );

const { loading } = useSelector( state => state.ui );

const [formValues, handleInputChange ] = useForm({

  name: '',
  email: '',
  password: '',
  password2: '',  
});

const {name, email, password, password2 } = formValues;

const handleRegistrer = (e) => { 
  
  e.preventDefault();
  if ( isFormValid() ) {
    dispatch( startRegisterWithEmailPassword(formValues) );
  }

}

const isFormValid = () => {
    
  if ( name.trim().length === 0 ) {
      dispatch( setError('Name is required') )
      return false;
  } else if ( !validator.isEmail( email ) ) {
      dispatch( setError('Email is not valid') )
      return false;
  } else if ( password !== password2 || password.length < 5 ) {
      dispatch( setError('Password should be at least 6 characters and match each other') )
      return false
  }
  
  dispatch( removeError() );
 
  return true;

}

return (
<div className='container'>
  <div className='centro'>
    <h2> Dar de alta alumno </h2>
    <hr/>
    <form onSubmit={ handleRegistrer }> 

            {
                msgError &&
                (
                    <div className="auth__alert-error">
                        { msgError }
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
            onChange={ handleInputChange }
           />          
        </div>
        <div className='mb-2 col-sm-6'>
          <label className='form-label'>Email* </label>
          <input 
            type='email' 
            className='form-control' 
            name='email' 
            required 
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
          />          
        </div> 
        <div className='mb-2 col-sm-6'>
          <label className='form-label'>Confirmar Contraseña* </label>
          <input 
            type='password' 
            className='form-control' 
            name='password2' 
            required
            onChange={ handleInputChange }
          />            
        </div>

        <div className='row'>
        <div className='mb-2 col-sm-6'>
          <label className='form-label'>Boleta* </label>
          <input 
            type='password' 
            className='form-control' 
            name='password' 
            required 
            onChange={ handleInputChange }
          />          
        </div> 
        <div className='mb-2 col-sm-6'>
        <button 
            type="submit"
            className="btn btn-primary btn-registro"
            disabled= { loading }
          >
                Registrar
          </button>   
        </div>
        </div>

      </div>
    </form>
  </div>
</div>
)
}
