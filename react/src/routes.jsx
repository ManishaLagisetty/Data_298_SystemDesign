import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

// project import
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

// ==============================|| ROUTES ||============================== //

const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export const routes = [
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },  
  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    exact: true,
    path: '/about-us',
    element: lazy(() => import('./views/auth/aboutus/AboutUs'))
  },  
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/home',
        element: lazy(() => import('./views/ui-elements/HomePage'))
      },
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/ui-elements/Overview'))
      },    
      {
        exact: 'true',
        path: '/pothole_detection',
        element: lazy(() => import('./views/ui-elements/PotholeDetection'))
      },
      {
        exact: 'true',
        path: '/crack_detection',
        element: lazy(() => import('./views/ui-elements/CrackDetection'))
      },
      {
        exact: 'true',
        path: '/illegal_dumping',
        element: lazy(() => import('./views/ui-elements/IllegalDumping'))
      },
      {
        exact: 'true',
        path: '/car_accidents',
        element: lazy(() => import('./views/ui-elements/CarAccident'))
      },
      {
        exact: 'true',
        path: '/wildlife_detection',
        element: lazy(() => import('./views/ui-elements/WildlifeDetection'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default renderRoutes;
