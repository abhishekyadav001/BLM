import React, { lazy, Suspense } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoutes from './ProtectedRoutes';
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const MyBooks = lazy(() => import('../pages/MyBooks'));
const MyLibrary = lazy(() => import('../pages/MyLibrary'));

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={
                <ProtectedRoutes>
                    <Home />
                </ProtectedRoutes>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mybooks" element={<MyBooks />} />
            <Route path="/mylibrary" element={<MyLibrary />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>


    )
}

export default AppRoutes
