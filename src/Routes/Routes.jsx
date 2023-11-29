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
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AllParcel from "../pages/Dashboard/Admin/AllParcels/AllParcels";
import AllDelaveryMen from "../pages/Dashboard/Admin/AllDelaveryMen/AllDelaveryMen";
import Modal from "../pages/Dashboard/User/MyParcel/Modal";
import AllUser from "../pages/Dashboard/Admin/AllUser/AllUser";
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import MyDelavery from "../pages/Dashboard/DelaveryMen/MyDelavery";
import MyReview from "../pages/Dashboard/DelaveryMen/MyReview/MyReview";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory"
import Success from "../pages/Dashboard/Payment/Success";
import AdminPrivateRoute from "./AdminPrivateRoute";
import DelRoute from "./DelRoute";
import MapComponent from "../pages/Dashboard/DelaveryMen/MapComponent";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
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
      },
      {
        path:'payment',
        element:<Payment></Payment>
      }
      ,
      {
        path:'/dashboard/paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
      {
          path:'success',
          element:<Success></Success>
      },
      // admin only routes
      {
        path:'statistics',
        element:<AdminPrivateRoute><Statistics></Statistics></AdminPrivateRoute>
      },
      {
        path:'adminHome',
        element:<AdminPrivateRoute><AdminHome></AdminHome></AdminPrivateRoute>
      },
      {
        path:'allparcel',
        element:<AdminPrivateRoute><AllParcel></AllParcel></AdminPrivateRoute>
      },{
        path:'alldelavery',
        element:<AdminPrivateRoute><AllDelaveryMen></AllDelaveryMen></AdminPrivateRoute>
      },{
        path:'parcel/modal',
        element:<Modal></Modal>
      },
      {
        path:'alluser',
        element:<AllUser></AllUser>
      },
      {
        path:'mydelavery',
        element:<DelRoute><MyDelavery></MyDelavery></DelRoute>
      },
      {
        path:'myreview',
        element:<DelRoute><MyReview></MyReview></DelRoute>
      },
      {
        path:'mydelavery/map/:id',
        element:<MapComponent></MapComponent>,
        loader:({params})=>fetch(`http://localhost:5000/parceldetail/${params.id}`)

      }
    ]
  }
]);
export default router;