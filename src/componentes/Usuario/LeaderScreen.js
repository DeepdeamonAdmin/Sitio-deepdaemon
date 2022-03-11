import React from 'react';
import { useGet } from '../../hooks/useGet';
import { getMemberStatus } from '../../selectors/get/getMemberStatus';



// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LeaderScreen = () => {

    const status = 'leader';
    
    const { data:leader, loading } = useGet(getMemberStatus, status);

    
    return (
        <>
            { loading && <p className="animate__animated animate__flash">Loading</p> }
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    leader.map(item => (
                        <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540 } }>
                        <div className="row no-gutters">
                            <div className="col-md-4"> 
                                <img 
                                src={`../../../../media/team/user.png`}
                                alt="member" 
                                className = "card-img"
                                />
                            </div>  
                            <div className="col-md-5">
                                <div className="card-body">
                                    <h5 className="card-title"> {item.name} </h5>
                                    <p className="card-text"> {item.email} </p>
                                </div>               
                            </div>
                           
                        </div>
                    </div>
                    ))
                }
            </div>
        </>
    )
}
