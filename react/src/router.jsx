import {createBrowserRouter} from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import ExchangeRates from "./views/ExchangeRates/ExchangeRates.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/rates/:currency',
    element: <ExchangeRates />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;
