import React from 'react'
import { useDispatch } from 'react-redux';
import { registerCareer } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';

const FormAddCareer = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
		name:'',
		shortName:'',		  
	});

    const { name, shortName } = formValues;

     //envio a la api
     const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( registerCareer(formValues) );
		console.log(formValues);
    }

    return (
        <div className="login">
        <form onSubmit={ handleSubmit }>                    
            <div className="col mb-3">
                <label>Av. Career </label>
                <input 
                    className="form-control"
                    type='text'
                    name='shortName'
                    placeholder='ShortCareer'
                    value = { shortName }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="col-mp-4 mb-3">
                <label> Career </label>
                <input
                    className="form-control" 
                    type='text'
                    name='name'
                    placeholder='Career'
                    value = { name }
                    onChange={ handleInputChange }
                />                                          
            </div>			           
            <button
                className="btn2 btn-primary btn-large btn-block"
                type="submit"					
            >
                Agregar
            </button>   
        </form>
    </div>
    )
}

export default FormAddCareer
