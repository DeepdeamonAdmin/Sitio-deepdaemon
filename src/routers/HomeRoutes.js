import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Login } from '../componentes/auth/Login';
import { Registrer } from '../componentes/auth/Registrer';
import { NavBar } from '../componentes/ui/NavBar'
import { RutaError } from '../componentes/ui/RutaError'
import { General } from '../componentes/Usuario/General'

export const HomeRoutes = () => {
  return (
    <>
        <NavBar />
        <div>
            <Routes>
                <Route index element={ <General /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='registrer' element={ <Registrer />} />
                <Route path="*" element={ <RutaError />} />
            </Routes>
        </div>
    </>
  )
}
