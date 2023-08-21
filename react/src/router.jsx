import {createBrowserRouter} from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;
