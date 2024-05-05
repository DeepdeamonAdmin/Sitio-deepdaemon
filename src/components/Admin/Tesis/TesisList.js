//Uso de React
import React from 'react'

//Uso de Redux
import { useSelector } from 'react-redux';

//Componentes necesarios
import TesisCard from './TesisCard';

const TesisList = () => {

    //Obtención de las tesis del estado
    const { tesis } = useSelector(state => state.tesis);
    
    //Despliegue de las tarjetas de las tesis
    return (
        <>
            <div className='row'>
                <div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap justify-content-between" style={{gap:"5px"}}>
                    {
                        tesis.map(item => (
                            <TesisCard
                                key={item.id}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TesisList
