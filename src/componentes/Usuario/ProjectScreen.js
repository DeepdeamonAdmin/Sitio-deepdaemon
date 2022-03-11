import React from 'react'
import { useGet } from '../../hooks/useGet';
import { getProjectStatus } from '../../selectors/get/getProjectStatus';
import { ControlModal } from './ControlModal';
import { ModalInfoProject } from './ModalInfoProject';

export const ProjectScreen = ({status}) => {

    const { data:project, loading } = useGet(getProjectStatus, status);
    
  return (
    <>
    { loading && <p className="animate__animated animate__flash">Loading</p> }
    <div className="card-columns animate__animated animate__fadeIn">
        {
            project.map(item => (
                <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540 } }>
                <div className="row no-gutters">
                    <div className="col-md-4"> 
                        <img 
                        src={`../../../../media/proyectos/project.png`}
                        alt="member" 
                        className = "card-img"
                        />
                    </div>  
                    <div className="col-md-5">
                        <div className="card-body">
                            <h5 className="card-title"> {item.name} </h5>
                            <p className="card-text"> {item.descr} </p>
                        </div>               
                    </div>
                    <div className="col-md-2 mb-2">
                        <ModalInfoProject key={item.id}
                            {...item} />
                        <ControlModal /> 
                    </div> 
                   
                </div>
            </div>
            ))
        }
    </div>
</>
  )
}
