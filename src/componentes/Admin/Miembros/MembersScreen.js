import React from 'react';
import { ModalAddMembers } from './ModalAddMembers';
import { AddNewFab } from '../../ui/AddNewFab';
//import { SearchScreen } from '../../ui/SearchScreen';
import { MemberList } from './MemberList';


// const imagen = require.context('../../rutaimagen', true); //para rutas dinamicas en imagenes parte 1 ponerlo en helpers

export const MembersScreen = () => {
    
    
    
    return (
        <>
        <div className="Container">
            <div className="row">
                <div className="col mb-3">
                    <h1> Colaboradores DeepDaemon </h1>
                </div>
            </div>
            <div className="row">
                {/* <SearchScreen /> */}
                <div className="col-md-2 mb-2">
                    <ModalAddMembers />
                    <AddNewFab /> 
                </div>    
            </div>
        </div>
        <div>
            <MemberList />
        </div>
    </>
    )
}
