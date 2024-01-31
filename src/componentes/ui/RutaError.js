//Uso de React
import React from 'react'

//Uso de Link para la navegación en el sitio
import { Link } from 'react-router-dom'

//Despliegue de la ruta de error
export const RutaError = () => {
  return (
    <div>
        La Pagina solicitada no ha sido encontrada, 
        <Link className='fs-3 fw-bolder text-reset' to='/' > Volver a sitio </Link>
    </div>
  )
}
