import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import routesList from './RoutesConstants.jsx';
import PrivateRoute from './privateRoute/privateRoute.jsx';

export default function AppRoutes() {
    return(
      <BrowserRouter>
        <Routes>
          {routesList().map((route, z) => {
            const Component = route.component;
            if(!route.isPrivate && !route.isIndex) {
              return (
                <Route key={z} path={route.path} element={<Component />} />
              )
            } else if(route.isPrivate && !route.isIndex) {
              return (
                <Route key={z} path={route.path} element={<PrivateRoute><Component /></PrivateRoute>} />
              )
            }
            return(
              <Route key={z} path={route.path} element={<Component />} index />
            )
            
          })}
        </Routes>
      </BrowserRouter>
    )
}