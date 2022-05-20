import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddGalery } from './ModalAddGalery'

export const GaleryScreen = () => {
    return (
        <div>
            <h1>Pagina Galeria</h1>
            <ModalAddGalery/>
            <AddNewFab /> 
        </div>
    )
}
