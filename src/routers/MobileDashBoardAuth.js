import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GeneralMobile } from '../componentes/Usuario/GeneralMobile';
import { NavBarMobileAuth } from '../componentes/ui/NavBarMobileAuth';


export const MobileDashBoardAuth = () => {
	return (
	<>  
        <NavBarMobileAuth/>
        <div>
            <Routes>
                <Route path="" element={<GeneralMobile />} />
            </Routes>
    </div>
    </>
	)
}