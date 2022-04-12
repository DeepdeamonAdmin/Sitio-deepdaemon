import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Login } from '../componentes/Admin/Login'
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
                <Route path="*" element={ <RutaError />} />
            </Routes>
        </div>
    </>
  )
}
