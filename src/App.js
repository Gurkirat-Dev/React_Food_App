import ReactDOM from "react-dom/client";
import Header from "../src/components/Header";
import Body from "../src/components/Body";
import About from "../src/components/About";
import Contact from "../src/components/Contact";
import Error from "../src/components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Cart from "../src/components/Cart";
import RestaurantMenu from "../src/components/RestaurantMenu";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import ProtectedRoutes from "./services/ProtectedRoutes";
import { Suspense, lazy } from "react";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";


const Grocery = lazy(() => import("./components/Grocery"));
const AppLayout = () => {
  return (
   
    <div className="app">
      <Header />
      <Outlet />
    </div>
  
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Body />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/grocery",
            element: (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Grocery />
              </Suspense>
            ),
          },
          {
            path: "/restaurants/:resId",
            element: <RestaurantMenu />,
          },
        ],
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Provider store={appStore}><RouterProvider router={appRouter} /></Provider>);
