import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddrelease } from './ModalAddrelease'

export const ReleaseScreen = () => {
    return (
        <div>
            <h1> Publicaciones DeepDaemon </h1>
            <ModalAddrelease />
            <AddNewFab /> 
        </div>
        
    )
}
