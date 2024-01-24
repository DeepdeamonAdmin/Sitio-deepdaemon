//Uso de React
import React from 'react';

//Uso de rutas
import { Route, Routes } from 'react-router-dom';

//Uso de ruta hacia la página general (principal) de la version mobile
import { GeneralMobile } from '../componentes/Usuario/GeneralMobile';

//Uso de ruta de la barra de navegación de algun usuario autenticado en la version mobile
import { NavBarMobileAuth } from '../componentes/ui/NavBarMobileAuth';

export const MobileDashBoardAuth = () => {

    //Redirección de rutas hacia los componentes.
	return (
	<>  
        <NavBarMobileAuth />
        <div>
            <Routes>
                <Route path="" element={<GeneralMobile />} />
            </Routes>
    </div>
    </>
	)
}