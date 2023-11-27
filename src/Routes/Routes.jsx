import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "../pages/Dashboard/User/BookParcel/BookParcel";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
             path:'/signup',
             element:<SignUp></SignUp>
        }
        
    ]
},
{
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'userHome',
        element: <Home></Home>
      },
      {
        path:'book',
        element:<BookParcel></BookParcel>
      }
      

      // admin only routes
      
    ]
  }
]);
export default router;