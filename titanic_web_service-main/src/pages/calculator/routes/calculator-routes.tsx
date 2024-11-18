import { RouteObject } from 'react-router-dom';

import CalculatorPage from '../views/calculator-page/calculator-page';

const calculatorRoutes: Array<RouteObject> = [
  {
    path: 'calculator',
    element: <CalculatorPage />,
  },
];

export default calculatorRoutes;
