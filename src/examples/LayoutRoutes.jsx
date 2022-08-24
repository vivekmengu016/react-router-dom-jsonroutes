import React from "react";
import JRouter from '../lib/index';
import { BrowserRouter, Navigate } from "react-router-dom";

import { Home, AboutUs, ContactUs,  FourZeroFour, Reviews, Products, Login } from '../Pages'

const authMiddleware = ({ component: Component, secure = false }) => {
    {/* improve your auth logic here */}
    let isLogin = true;

    if (secure) {
        return isLogin ? <Component /> : <Navigate to="/login" />
    }

    return !isLogin ? <Component /> : <Navigate to="/" />
}

function LayoutRoutesExample () {
    return (
        <BrowserRouter>
            <JRouter routesList={[
                {
                    path: '',
                    secure: true, // if true every nested route will be `secure`
                    wrapper: Home,
                    children: [
                        {
                            path: 'about',
                            component: AboutUs,
                            children: [
                                {
                                    path: 'review',
                                    wrapper: Reviews,
                                    secure: false, // false wont work here as parent has `secure` true
                                    children: [{
                                        path: 'products',
                                        component: Products
                                    },{
                                        path: 'contact',
                                        component: ContactUs
                                    }]
                                }
                            ]
                        },
                        {
                            path: 'contact',
                            component: ContactUs
                        }
                    ]
                },
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: '*',
                    component: FourZeroFour
                }
            ]} authMiddleware={authMiddleware} />
        </BrowserRouter>
    );
}

export default LayoutRoutesExample ;
