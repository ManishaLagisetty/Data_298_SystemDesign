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
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
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
        path: '/pothole-detection',
        element: lazy(() => import('./views/ui-elements/PotholeDetection'))
      },
      {
        exact: 'true',
        path: '/crack-detection',
        element: lazy(() => import('./views/ui-elements/CrackDetection'))
      },
      {
        exact: 'true',
        path: '/illegal-dumping',
        element: lazy(() => import('./views/ui-elements/IllegalDumping'))
      },
      {
        exact: 'true',
        path: '/car-accidents',
        element: lazy(() => import('./views/ui-elements/CarAccident'))
      },
      {
        exact: 'true',
        path: '/wildlife-detection',
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
