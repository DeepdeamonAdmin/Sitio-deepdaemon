import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const PublicationDetails = () => {
    const {idPub} = useParams() // Obtiene el parámetro dinámico ":idPub" de la URL
    const publications = useSelector(state => state.publications)
    const publication = publications["publications"].find(p => p.id === idPub)// Este obtiene la publicación por el id del state
    if(!publication) {
        return <div>Cargando...</div> // Este es un mensaje de carga en lo que se obtienen las publicaciones
    }

    // TODO: Aquí hay que darle formato y estilos para presentar la información de mejor manera
    return (
        <div>
            <h2>{publication.title ? publication.title : 'Sin título'}</h2>
            <p>Autor: {publication.autor}</p>
            <p><img src={publication.frontImg} alt="Imagen" /></p>
            <p>Tipo: {publication.postType ? publication.postType : 'Sin tipo'}</p>
            <p>Organización: {publication.organization}</p>
            <p>{publication.descripcion ? publication.descripcion : 'Sin descripción'}</p>
        </div>
    )
}
