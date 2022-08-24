import React from "react";
import JRouter from '../lib/index';
import { BrowserRouter, Navigate } from "react-router-dom";

import { Home, Products, SingleProduct, Reviews, Login, FourZeroFour } from '../Pages'

const authMiddleware = ({ component: Component, secure = false }) => {
    {/* improve your auth logic here */}
    let isLogin = false;

    if (secure) {
        return isLogin ? <Component /> : <Navigate to="/login" />
    }

    return !isLogin ? <Component /> : <Navigate to="/" />
}

function AuthRoutesExample() {
    return (
        <BrowserRouter>
            <JRouter routesList={[
                {
                    path: '',
                    secure: true,
                    component: Home
                },
                {
                    path: 'login',
                    secure: false,
                    component: Login
                },
                {
                    path: 'products',
                    secure: true,
                    component: Products,
                    children: [{
                        path: ':product_id',
                        component: SingleProduct
                    }]
                },
                {
                    path: '*',
                    component: FourZeroFour
                }
            ]} authMiddleware={authMiddleware} />
        </BrowserRouter>
    );
}

export default AuthRoutesExample;
