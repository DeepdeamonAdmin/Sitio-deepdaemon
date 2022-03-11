import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';



export const Login = ({ history }) => {

	const dispatch = useDispatch();
	const { msgError } = useSelector( state => state.ui );
	const { loading } = useSelector( state => state.ui );

	
	
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
			history.replace(lastPath)	
		}
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
        <div className="login">
		<div className="login-screen">
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
			<form onSubmit={ handleLogin }>
			<div className="login-form">
				<div className="control-group">
					
					<input
						type="text"
						className="login-field"
						placeholder="Email"
						name="email"
						autoComplete="off"
						value={ email }
						onChange={ handleInputChange }
						/>

				</div>

				<div className="control-group">
					<input 
						type="password"
						className="login-field"  
						placeholder="Password"
						name ="password"
						value={ password }	
						onChange={ handleInputChange }
						/>
				
				</div>

				<button
					className="btn2 btn-primary btn-large btn-block"
					type="submit"
					disabled= { loading } 
					
				>
					Login
				</button>
			</div>

			</form>

			
		</div>
	</div>
    )
}
