import { RouteObject } from 'react-router-dom';

import { NotFoundPage } from '@/core/error';

import homeRoutes from '../pages/home/routes';
import calculatorRoutes from '../pages/calculator/routes';

const appRoutes: Array<RouteObject> = [
  ...homeRoutes,
  ...calculatorRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];


export default appRoutes;
