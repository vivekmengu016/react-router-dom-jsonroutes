import React from "react";
import JRouter from '../lib/index';
import { BrowserRouter } from "react-router-dom";

import { Home, Products, SingleProduct, SingleProductEdit, Reviews, FourZeroFour, ContactUs } from '../Pages'

const authMiddleware = ({ component: Component }) => {
    return <Component />
}

function NestedRoutesExample() {
    return (
        <BrowserRouter>
            <JRouter routesList={[
                {
                    path: '',
                    component: Home,
                    children: [{
                        path: 'contact',
                        component: ContactUs
                    }]
                },
                {
                    path: 'products',
                    wrapper: Products,
                    children: [
                        {
                            path: 'reviews',
                            wrapper: Reviews,
                            children: [{
                                path: 'contact',
                                component: ContactUs
                            }]
                        },
                        {
                            path: ':product_id',
                            component: SingleProduct,
                            children: [{
                                path: 'edit',
                                component: SingleProductEdit
                            }]
                        }, 
                        
                    ]
                },
                {
                    path: '*',
                    component: FourZeroFour
                }
            ]} authMiddleware={authMiddleware} />
        </BrowserRouter>
    );
}

export default NestedRoutesExample;
