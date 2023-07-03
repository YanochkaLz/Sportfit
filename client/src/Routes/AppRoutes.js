import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from "./routes";
import { Context } from "../index";

const AppRoutes = () => {
  const { user } = useContext(Context)

  return (
    <div style={{height: '100vh', backgroundColor: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <BrowserRouter>
        <Routes>
          {user.isAuth && authRoutes.map(({ path, Component }) => {
            if (path === '/admin' && user.user.role !== 'ADMIN') return null;
            return <Route key={path} path={path} element={Component} exact />
          })}

          {publicRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} element={Component} exact />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
