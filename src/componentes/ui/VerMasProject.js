import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { auth } from '../../firebase/firebase-config';

import './Ui.css';
import { ProjectDetaills } from '../Usuario/ProjectDetaills';

export const VerMasProject = (project) => {

    const dispatch = useDispatch();
    const proy = project;

    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }

    const user = auth.currentUser;
    

    if (!user) return <div style={{marginTop:-15 ,marginBottom: -15}}>
    <button
        className="btn btn-success"
        onClick={handleClickNew}
    >
        Ver más..
    </button>
    </div>

    return <ProjectDetaills project = {proy.project}/>







}
