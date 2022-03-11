import React from 'react'
import { useDispatch } from 'react-redux';
import { registerInstitution } from '../../../actions/register';
import { useForm } from '../../../hooks/useForm';

const FormAddInstitution = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
		name:'',
		shortName:'',		  
	});

    const { name, shortName } = formValues;

    //envio a la api
    const handleSubmit = (e) => {
        e.preventDefault();
		dispatch( registerInstitution(formValues) );
		console.log(formValues);
    }

    return (
        <div className="login">
        <form onSubmit={ handleSubmit }>                    
            <div className="col mb-3">
                <label>Av. School </label>
                <input 
                    className="form-control"
                    type='text'
                    name='shortName'
                    placeholder='ShortSchool'
                    value = { shortName }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="col mb-3">
                <label> School </label>
                <input 
                    className="form-control"
                    type='text'
                    name='name'
                    placeholder='School'
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

export default FormAddInstitution
