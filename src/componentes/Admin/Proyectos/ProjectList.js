import React from 'react'
import { useGet } from '../../../hooks/useGet'
import { getProject } from '../../../selectors/get/getProject';
import ProjectCard from './ProjectCard';



const ProjectList = () => {
    
    const { data:project, loading } = useGet(getProject);
    
    
    return (
        <>
            { loading && <p className="animate__animated animate__flash">Loading</p> }
        
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    project.map(item => (
                        <ProjectCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default ProjectList
