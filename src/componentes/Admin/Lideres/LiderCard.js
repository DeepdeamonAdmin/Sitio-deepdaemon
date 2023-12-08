import React from 'react'
import { Link } from 'react-router-dom';

export const LiderCard = (item) => {
    return (
            <div className="card" style={{ maxWidth: 450, height: 180, minWidth: 350 }}>
                <div className="row no-gutters">
                    <div className="col-4 d-flex align-items-stretch" >
                        <img src={item.urlImg} 
                            className="imageleader d-inline-flex p-2" 
                            alt="..."

                            style={{
                                marginLeft : '10%',
                                width : '160px',
                                height : '180px',
                                borderRadius : "10%"
                            }}  
                        />
                    </div>
                    <div className="col-8 d-flex flex-column">
                        <div className="card-body p-1 mr-2">
                            <h5 className="card-title ml-2 mt-2" style={{height:40}}> {item.nombre} </h5>
                            <p className="card-text"> {item.email} </p>
                            
                        </div>
                        <div className='card-body d-grid gap-2 d-md-flex justify-content-md-end mr-2'>
                            <Link to={`editar/${item.id}`} className="btn btn-primary btn-sm p-2">
                                Editar
                            </Link>
                        </div>
                    </div>
                </div>
            </div >

    )
}


