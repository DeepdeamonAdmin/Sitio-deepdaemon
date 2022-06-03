import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMember } from '../../../actions/delete';



export const LiderCard = (item) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
		dispatch( deleteMember(item.id) );
    }
    return (
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
                <div className="col-md-1">
                    <p>
                        <Link
                            to={ `/admin/lideres` }
                            className ="btn btn-primary btn-sm">
                                Edit
                        </Link>
                    </p>
                    
                    <p>
                        <button 
                            type="button" 
                            className="btn btn-success btn-sm"
                            onClick={ handleDelete }>Delete</button>
                    </p>
                    <p>
                        <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            >Proyectos</button>
                    </p>
                </div>
            
            </div>
        </div>
    )
}
