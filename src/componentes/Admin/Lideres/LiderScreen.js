import React from 'react';
import { ModalAddLider } from './ModalAddLider';
import { AddNewFab } from '../../ui/AddNewFab';
//import { SearchScreen } from '../../ui/SearchScreen';
import { LiderList } from './LiderList';
import { Link } from 'react-router-dom';


// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const LiderScreen = () => {
    
    
    
    return (
        <>
        <div className="Container">
            <div className="row">
                <div className="col mb-3">
                    <h1> Líderes DeepDaemon </h1>
                </div>
            </div>
            <div className="row">
                {/* <SearchScreen /> */}
                <div className="col-md-2 mb-2">
                    {/* <ModalAddLider />
                    <AddNewFab />  */}
                    <Link to={`agregar`} className="btn btn-primary fab">
                        <i className="fas fa-plus"></i>
						</Link>
                </div>    
            </div>
        </div>
        <div>
            <LiderList />
        </div>
    </>
    )
}
