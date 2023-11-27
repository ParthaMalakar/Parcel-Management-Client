import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "../pages/Dashboard/User/BookParcel/BookParcel";
import MyParcel from "../pages/Dashboard/User/MyParcel/MyParcel";
import ParcelDetails from "../pages/Dashboard/User/MyParcel/ParcelDetails";
import Profile from "../pages/Dashboard/User/Profile/Profile";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";



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
        path: 'userhome',
        element: <UserHome></UserHome>
      },
      {
        path:'book',
        element:<BookParcel></BookParcel>
      }
      ,{
        path:'parcel',
        element:<MyParcel></MyParcel>
      },
      {
        path:'details/:id',
        element:<ParcelDetails></ParcelDetails>,
        loader:({params})=>fetch(`http://localhost:5000/parceldetail/${params.id}`)

      },
      {
        path:'profile',
        element:<Profile></Profile>
      }

      // admin only routes
      
    ]
  }
]);
export default router;