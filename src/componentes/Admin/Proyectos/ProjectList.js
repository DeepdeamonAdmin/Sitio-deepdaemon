import React from 'react'
import ProjectCard from './ProjectCard';
import { useSelector } from 'react-redux';
import {
	getAuth,
} from 'firebase/auth';

const ProjectList = () => {

    const auth = getAuth();
    const dN = auth.currentUser.displayName;

    const { projects } = useSelector(state => state.projects);
    
    return (
        <>
            {/* { loading && <p className="animate__animated animate__flash">Loading</p> } */}
        
            <div>
                {
                    projects.map(item => (
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
