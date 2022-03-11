import React from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });
    const { searchText } = formValues;
    

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Probando boton", searchText);
        // history.push(`?q=${ searchText }`);
    }

    return (
        <>
                <div className='col-md-6'>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="form-control form-control-lg"
                        name="searchText"
                        autoComplete="off"
                        value={ searchText }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="col-md-2">
                    <button
                        type="submit"
                        className="btn btn-lg btn-dark"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>              
        </>
        )
    }   