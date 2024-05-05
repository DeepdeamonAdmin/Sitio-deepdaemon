//Uso de React
import React from 'react'

//Uso de Redux
import { useDispatch, useSelector } from 'react-redux';

//Uso de Validator
import validator from 'validator';

//Uso del hook useForm
import { useForm } from '../../hooks/useForm';

//Componentes necesarios
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import './Login.css'
import googleIconn from '../../assets/GoogleLogin.svg';
import candadoIconn from '../../assets/llave.png';
import sobreIconn from '../../assets/sobreLogin.svg';

export const Login = ({ history }) => {

    //Declaración del dispatch
	const dispatch = useDispatch();

    //Obtención del estado el estado de cargar y el mensaje de error
	const { loading } = useSelector( state => state.ui );
	const { msgError } = useSelector( state => state.ui );
	
    //Contenido del formulario para el inicio de sesión
	const [ formValues, handleInputChange ] = useForm({
		email: '',
		password: ''
	});
	const { email, password } = formValues;

    //Función para manejar el inicio de sesión
	const handleLogin = (e) => {
		const lastPath = localStorage.getItem('lastPath') || '/admin';
		e.preventDefault();
		if( isFormValid() ){

            //Envio al estado el inicio de sesión con correo
			dispatch( startLoginEmailPassword(email, password) );
            if(history === undefined) return;
			history.replace("lastPath")	
		}
	}

	  //Manda la accion para acceder por Google
	  const handleGoogleLogin = () => {

        //Envio al estado el inicio de sesión con google
        dispatch( startGoogleLogin() );
    }

    //Función para la verificación del formulario
	const isFormValid = () => {
        if ( !validator.isEmail( email ) ) {

            //Envio al estado del error de correo inválido
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password.length < 5 ) {

            //Envio al estado de contraseña incorrecta
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false
        }
        
        //Envio al estado de eliminación del error
        dispatch( removeError() );
       return true;
    }
	
    //Despliegue de la pantalla de inicio de sesión
    return (
        <div className="container" style={{display:"flex",overflow:"hidden",paddingLeft:0,justifyContent:"center"}}>
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
