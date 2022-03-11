import React from 'react'
import FormaAddTeach from './FormaAddTeach'
import FormAddCareer from './FormAddCareer'
import FormAddInstitution from './FormAddInstitution'
// import Prueba from './Prueba'

export const OtherScreen = () => {
    return (
        <div>
            <div className='row'>
                <div className='col'>
                    <h2> Agregar Institución </h2>
                    <hr/>
                    <FormAddInstitution />
                </div>
                <div className='col'>
                    <h2> Agregar Carrera </h2>
                    <hr/>
                    <FormAddCareer />
                </div>
            </div>
            <div className='row'>
                <div>
                    <h2> Agregar Tecnología </h2>
                    
                    <FormaAddTeach />
                </div>
            </div>
        </div>
    )
}
