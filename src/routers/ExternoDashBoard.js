import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { General } from '../componentes/Usuario/General';
import { NavBarExterno } from '../componentes/ui/NavBarExterno';


export const ExternoDashBoard = () => {
	return (
	<>  
        <NavBarExterno/>
        <div>
            <Routes>
                <Route path="/" element={<General />} />
            </Routes>
        </div>
    </>
	)
}