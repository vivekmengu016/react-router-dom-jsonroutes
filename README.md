# Create a centralized routing config with React-Router-DOM-JSONRoutes

`react-router-dom-jsonroutes` is the simplified way of handling all your multi-nested routes in one single place as JSON data, RRDJR comes with only two props `routesList` and `authMiddleware`

## Feature highlights
This library comes with 4 important features

*	[x] JSON routing (centralized routing)
*	[x] Authentication
*	[x] Layout Routes 
*   [x] Index Route

### Install
> [!NOTE]  
> This package works best with `react-router-dom@6.3.0`


```node
npm install react-router-dom-jsonroutes --save

```
---
## Quick Example

**Step 1:** Import the library and your favorite route components
```jsx
import { BrowserRouter, Navigate } from "react-router-dom";
import JsonRoutes from "react-router-dom-jsonroutes";

/* import your components here */
const Login from "../modules/Login";
const Dashboard from "../modules/Dashboard";
```


**Step 2:** Create `routesList` JSON object with all your application routes, see [Nested Examples](https://github.com/vivekmengu016/react-router-dom-jsonroutes/blob/master/src/examples/NestedRoutes.jsx) here
```jsx
/* add all your application routes as json data */
const routesList = [{
    path: 'login',
    component: Login,
    secure: false
}, {
    path: 'dashboard',
    component: Dashboard,
    secure: true
}]
```


**Step 3:** Also create an `authMiddleware` this will help to make decisions when you have private/secure routes, and also helps when you have role-based authentication
```jsx
/* create a authMiddle if required (optional) */
const authMiddleware = ({ component: Component, secure = false }) => {
    {/* improve your auth logic here */}
    let isLogin = true;

    if (secure) {
        return isLogin ? <Component /> : <Navigate to="/login" />
    }

    return !isLogin ? <Component /> : <Navigate to="/dashboard" />
}
```


**Step 4:** Finally, return your component as shown bellow
```jsx
return(
    <BrowserRouter>
        {/* render RRDJR as child inside BrowserRouter */}
        <JsonRoutes routesList={routesList} authMiddleware={authMiddleware} />
    </BrowserRouter>
)

```

---

## JSON Routing

We found value in having a centralized route configuration, A route is just data. React is great at mapping data into components, and is a component.

Route config is just an array of logical “routes” with `path`, `component`, `secure` and `index` props same way as you would add to any component.

#### Basic Example
```jsx
const routesList = [{
    path: 'login',
    component: Login,
    secure: false
},{
    path: 'dashboard',
    component: Dashboard,
    secure: true
}]
```

#### Nested Example
```jsx
const routesList = [{
    path: 'dashboard',
    component: Dashboard,
    secure: true
},{
    path: 'products',
    secure: true,
    component: Products,
    children: [
        {
            path: ':id',
            secure: true,
            component: ProductsSingle
        },
        {
            path: 'edit',
            secure: false,
            component: ProductsSingle
        },
        {
            path: 'cart',
            component: ProductsSingle
        }
    ]
}]
```

---

## Authentication

Why not have a centralization routing config? 
With authentication capabilities as a win-win for developers, RRDJR comes with `authMiddleware` prop which helps you to navigate users if not logged In.

#### Basic Example
```jsx
const authMiddleware = ({ component: Component, secure = false, user }) => {
    let isLogin = true;

    if (secure) {
        return isLogin ? <Component /> : <Navigate to="/login" />
    }
    return !isLogin ? <Component /> : <Navigate to="/dashboard" />
}
```

#### Redux Example
```jsx
const authMiddleware = connect((state) => ({
    user: state.auth.user
}), {})(({ component: Component, secure = false, user }) => {
    let hasUserDetails = user._id ? true : false

    if (secure) {
        return hasUserDetails ? <Component /> : <Navigate to="/login" />
    }
    return !hasUserDetails ? <Component /> : <Navigate to="/dashboard" />
})
```

---

## Layout Routes

Layout routes are parent routes used exclusively for grouping child routes inside a specific layout.

#### Basic Example
```jsx
const routesList = [{
    path: 'settings',
    secure: true, // if true every nested route will be `secure`
    wrapper: Settings,
    children: [
        {
            path: 'profile',
            component: Profile
        }
    ]
}, {
    path: 'docs',
    secure: false, // if false child routes can have `secure` true || false
    wrapper: Teams,
    children: [{
        path: 'api',
        secure: true,
        component: APIDocs
    }, {
        path: 'get-started',
        component: GetStarted
    }]
}]
```
then, To render the child, you need to render an `<Outlet />` component
```jsx
import { Outlet } from "react-router-dom";

const Settings = () => {
    return(
        <div>
            <h1>Settings</h1>
            <Outlet />
        </div>
    )
}
```

---


## Index Route

A child route with no path that renders in the parent's `<Outlet />` at the parent's URL.

#### Basic Example
```jsx
const routesList = [{
    path: 'docs',
    wrapper: Teams,
    children: [{
        path: 'api',
        component: APIDocs
    }, {
        index: true,
        component: GetStarted // this will render on `/docs` inside `<Outlet />`
    }]
}]
```
