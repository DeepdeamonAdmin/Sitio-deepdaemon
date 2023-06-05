import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';


import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import './Login.css'
import googleIconn from '../../assets/GoogleLogin.svg';
import candadoIconn from '../../assets/llave.png';
import sobreIconn from '../../assets/sobreLogin.svg';




export const Login = ({ history }) => {

	const dispatch = useDispatch();
	const { loading } = useSelector( state => state.ui );

	const { msgError } = useSelector( state => state.ui );
	
	const [ formValues, handleInputChange ] = useForm({
		email: '',
		password: ''
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
			
		const lastPath = localStorage.getItem('lastPath') || '/admin';
		e.preventDefault();
		if( isFormValid() ){
			dispatch( startLoginEmailPassword(email, password) );
            //console.log("This is email addres")
            //console.log(email)
            if(history === undefined) return;
			history.replace(lastPath)	
		}
	}

	  //manda la accion para acceder por Google
	  const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

	const isFormValid = () => {
        
        if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false
        }
        
        dispatch( removeError() );
       return true;
    }
	
    return (
        <div className="container">
			<div className="principal">
				<div className="app-title">
					{
						msgError &&
						(
							<div className="auth__alert-error">
								{ msgError }
							</div>
						)
					}

				<h1>DeepDaemon</h1>
				<hr/>
				</div>
			<div className='login'>
			<div className='row medio'>
                    <div className='medio-cont' >
                        <button 
                            className ='boton-red'
                            onClick={ handleGoogleLogin }
                        >
                            <img src={googleIconn} alt='googleIconn' className='iconn-google' />
                            Acceder con Google
                        </button>
                    </div>
                </div>
                <form onSubmit={ handleLogin }>
                <div className='row medio'>
                    <div className='medio-cont' >
                        <div className='correo'>
                            <img src={sobreIconn} alt='Grupo Licon' className='iconn-correo' />
                            <input 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                name="email"
                                className='input-correo'
                                required
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </div>
                <div className='row medio'>
                    <div className='medio-cont'>
                        <div className='correo'>
                            <img src={candadoIconn} alt='Grupo Licon' className='iconn-correo' />
                            <input
                                type="password" 
                                placeholder="Contraseña" 
                                name="password"
                                className='input-correo' 
                                id="loginPassword"
                                required
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </div>
                <div className='row medio'>
                    <div className='medio-cont'>
                        <button 
                            type="submit"
                            className='btn-login'
                            disabled={ loading }
                        >
                            Ingresar
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
	</div>

			
    )
}
