import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { RouterName } from '@/constants/route';


const routeConfig: RouteObject[] = [
  {
    path: RouterName.BASE,
    Component: lazy(() => import('../layouts')),
    children: [
      {
        path: RouterName.HOME,
        Component: lazy(() => import('../pages/Home')),
      },
      {
        path: RouterName.HOUSE,
        Component: lazy(() => import('../pages/House')),
      },
      {
        path: RouterName.WECHAT,
        Component: lazy(() => import('../pages/MiniApp')),
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/NotFound')),
  },
];

export default routeConfig;
