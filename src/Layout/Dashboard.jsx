import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaMarkdown, FaSearch, FaShoppingCart, FaStreetView, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import useUser from "../hooks/useUser";
import useDelivary from "../hooks/useDelivary";
import { MdOutlineClearAll } from "react-icons/md";
import { TbPlaystationSquare } from "react-icons/tb";

const Dashboard = () => {


    // TODO: get isAdmin value from the database
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isUser, isUserLoading] = useUser();
    const [isDelivary, isDelivaryLoading] = useDelivary();
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="flex">
                {/* dashboard side bar */}
                <div className="md:w-64 md:min-h-screen bg-amber-300">
                    <ul className="menu p-4">
                        {
                            isAdmin &&
                            <>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/allparcel">
                                       <MdOutlineClearAll></MdOutlineClearAll>
                                        All Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/alluser">
                                    <FaUsers></FaUsers>
                                        All Users</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-lg" to="/dashboard/alldelavery">
                                    <FaUsers></FaUsers>
                                        All Delivery Men</NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                     className=" text-lg" to="/dashboard/statistics">
                                        <TbPlaystationSquare></TbPlaystationSquare>
                                        Statistics</NavLink>
                                </li>
                            </>

                        }
                        { isUser  &&
                            <>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/userhome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/book">
                                        <FaBook></FaBook>
                                        Book a Parcel</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/parcel">
                                        <FaMarkdown></FaMarkdown>
                                        My Parcels </NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/profile">
                                        <FaAd></FaAd>
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" text-lg" to="/dashboard/paymentHistory">
                                        <FaAd></FaAd>
                                        Payment History</NavLink>
                                </li>
                            </>
                        }
                        { isDelivary && 
                        <>
                        <li>
                            <NavLink className=" text-lg" to="/dashboard/userHome">
                                <FaHome></FaHome>
                                Delavary man Home</NavLink>
                        </li>
                        <li>
                            <NavLink className=" text-lg" to="/dashboard/mydelavery">
                                <FaCalendar></FaCalendar>
                                My Delivery List</NavLink>
                        </li>
                        <li>
                            <NavLink className=" text-lg" to="/dashboard/myreview">
                                <FaStreetView></FaStreetView>
                                My Review </NavLink>
                        </li>
                        
                    </>


                        }
                        {/* shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                       
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Dashboard;