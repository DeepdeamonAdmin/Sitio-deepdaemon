import React from 'react'
//import { AddNewFab } from '../../ui/AddNewFab'
//import { ModalAddProject } from './ModalAddProject'
import TesisListUser from './TesisListUser'
import { Link } from 'react-router-dom';

export const Tesis = () => {
    
    return (
        <>
            <div className="Container">
                <div className="row">
                    <div className="col mb-3">
                        <h1> Tesis </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        {/* <ModalAddProject />
                        <AddNewFab />  */}
                        <Link to='/user/addtesis' className="btn btn-primary fab">
                        <i className="fas fa-plus"></i>
						</Link>
                    </div>    
                </div>
            </div>
            <div>
                <TesisListUser />
            </div>
        </>
    )
}
