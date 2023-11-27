import React from 'react'
import PublicacionesList from './PublicacionesList'
import { Link } from 'react-router-dom';

export const ReleaseScreen = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-mb-3'>
                        <h1> Publicaciones DeepDaemon</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <Link to={`agregar`} className="btn btn-primary fab">
                        <i className="fas fa-plus"></i>
						</Link>
                    </div>    
                </div>
            </div>
            <div className=''>
                <div className='column'>
                    <PublicacionesList/>
                </div>
                
            </div>
        </>
        
    )
}
