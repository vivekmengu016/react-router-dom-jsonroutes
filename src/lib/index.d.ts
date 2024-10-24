import React, { ComponentType } from "react";

declare module "react-router-dom-jsonroutes" {
  export interface RouteItem {
    path: string;
    component?: ComponentType<any>; // Consider using a more specific type if possible
    wrapper?: ComponentType<any>; // Consider using a more specific type if possible
    children?: RouteItem[];
    secure?: boolean;
    index?: boolean;
  }

  export interface RRDJRProps {
    routesList?: RouteItem[];
    authMiddleware?: ComponentType<{ secure: boolean; component: ComponentType<any> }>;
  }

  const RRDJR: React.FC<RRDJRProps>;
  export default RRDJR;
}