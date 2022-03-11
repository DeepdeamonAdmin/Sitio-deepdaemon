import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { General } from '../componentes/Usuario/General'
import { NavBar } from '../componentes/ui/NavBar'

export const DashboardRouters = () => {
    return (
        <>
          <NavBar />
            <div>
                <Switch>
                    <Route exact path="/" component={ General } />
                    <Redirect to="/" />
                </Switch>
            </div>
        </>
    )
}
