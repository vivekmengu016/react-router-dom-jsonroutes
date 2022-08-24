import React from "react";
import JRouter from '../lib/index';
import { BrowserRouter } from "react-router-dom";

import { Home, AboutUs, FourZeroFour } from '../Pages'

function BasicExample() {
  return (
    <>
      <BrowserRouter>
        <JRouter routesList={[
          {
            path: '',
            component: Home
          },
          {
            path: 'about',
            component: AboutUs
          },{
            path: '*',
            component: FourZeroFour
          }
        ]} />
      </BrowserRouter>
    </>
  );
}

export default BasicExample;
