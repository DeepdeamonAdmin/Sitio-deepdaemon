import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { Publications } from '../../users/Publications'
import { ModalAddrelease } from './ModalAddrelease'
import PublicacionesList from './PublicacionesList'

export const ReleaseScreen = () => {
    return (
        <>
            <div>
                <h1> Publicaciones DeepDaemon </h1>
                <ModalAddrelease />
                <AddNewFab /> 
            </div>
            <div>
                {/*<Publications />*/}
                <PublicacionesList/>
            </div>
        </>
        
    )
}
