import React from 'react'
import { AddNewFab } from '../../ui/AddNewFab'
import { ModalAddProject } from './ModalAddProject'
import ProjectList from './ProjectList'

export const ProjectsScreen = () => {
    
    return (
        <>
            <div className="Container">
                <div className="row">
                    <div className="col mb-3">
                        <h1> Proyectos DeepDaemon </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <ModalAddProject />
                        <AddNewFab /> 
                    </div>    
                </div>
            </div>
            <div>
                <ProjectList />
            </div>
        </>
    )
}
