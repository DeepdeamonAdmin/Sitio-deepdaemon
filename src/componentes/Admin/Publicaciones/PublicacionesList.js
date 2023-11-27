import React from 'react'
import { useSelector } from 'react-redux';
import PublicacionesCard from './PublicacionesCard';

const PublicacionesList = () => {
    React.useEffect(()=>{
    },[])
    var  publications  = useSelector(state => state.publications);
    var publications_type = publications.publications.slice().sort(compararFechas);
    function esFechaInvalida(fechaString) {
        const fecha = new Date(fechaString);
        return isNaN(fecha) || fecha.toString() === 'Invalid Date';
    }
    function compararFechas(a, b) {
        if (esFechaInvalida(a.yearMonth)) {
        return 1; // a es inválida, va después de b
        }
        if (esFechaInvalida(b.yearMonth)) {
        return -1; // b es inválida, va después de a
        }
        return new Date(b.yearMonth) - new Date(a.yearMonth); // Ordenar fechas válidas
    }
    return (
        <>
            <div className="card-columns d-flex animate__animated animate__fadeIn">
                <div className='d-flex flex-wrap justify-content-center'>
                    {
                    publications_type.map( item=> (
                            <PublicacionesCard
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

export default PublicacionesList
