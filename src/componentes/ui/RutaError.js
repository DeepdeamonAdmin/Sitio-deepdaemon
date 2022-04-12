import React from 'react'
import { Link } from 'react-router-dom'

export const RutaError = () => {
  return (
    <div>
        La Pagina solicitada no ha sido encontrada, 
        <Link className='fs-3 fw-bolder text-reset' to='/' > Volver a sitio </Link>
    </div>
  )
}
