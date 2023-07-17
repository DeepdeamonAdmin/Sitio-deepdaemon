import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GeneralMobile } from '../componentes/Usuario/GeneralMobile';
import { NavBarMobileSinAuth } from '../componentes/ui/NavBarMobileSinAuth';
import { Login } from '../componentes/auth/Login';
import { Registrer } from '../componentes/auth/Registrer';
import { RutaError } from '../componentes/ui/RutaError'


export const MobileDashBoardSinAuth = () => {
	return (
	<>  
        <NavBarMobileSinAuth/>
        <div>
            <Routes>
                <Route path="" element={<GeneralMobile />} />
                <Route path='login' element={ <Login /> } />
                <Route path='registrer' element={ <Registrer />} />
                <Route path="*" element={ <RutaError />} />
            </Routes>
    </div>
    </>
	)
}