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
            <div className='row'>
                <div className="card-columns cards-cols animate__animated animate__fadeIn px-5 d-flex direction-columns flex-wrap justify-content-between" style={{gap:"5px"}}>
                    {
                        projects.map(item => (
                            <ProjectCard
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

export default ProjectList
