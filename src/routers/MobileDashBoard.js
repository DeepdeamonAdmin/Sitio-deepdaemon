import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GeneralMobile } from '../componentes/Usuario/GeneralMobile';
import { NavBarMobile } from '../componentes/ui/NavBarMobile';


export const MobileDashBoard = () => {
	return (
	<>  
        <NavBarMobile/>
        <div>
            <Routes>
                <Route path="" element={<GeneralMobile />} />
            </Routes>
    </div>
    </>
	)
}