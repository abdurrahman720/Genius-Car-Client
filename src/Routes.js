import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./Authentication/PrivateRoute";
import Main from "./Layout/Main";
import Checkout from "./Pages/Checkout/Checkout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Orders from "./Pages/Orders/Orders";
import Register from "./Pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/checkout/:id',
                element: <Checkout></Checkout>,
                loader:({params})=>fetch(`http://localhost:5001/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            }
        ]
    }
])