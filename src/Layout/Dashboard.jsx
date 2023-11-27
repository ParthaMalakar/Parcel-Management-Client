import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import useUser from "../hooks/useUser";
import useDelivary from "../hooks/useDelivary";


const Dashboard = () => {


    // TODO: get isAdmin value from the database
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isUser, isUserLoading] = useUser();
    const [isDelivary, isDelivaryLoading] = useDelivary();
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu p-4">
                        {
                            isAdmin && isAdminLoading &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils></FaUtensils>
                                        Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList></FaList>
                                        Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook></FaBook>
                                        Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers></FaUsers>
                                        All Users</NavLink>
                                </li>
                            </>

                        }
                        { isUser && isUserLoading &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Not History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaList></FaList>
                                        Real Payment History</NavLink>
                                </li>
                            </>
                        }
                        { isDelivary && 
                        <>
                        <li>
                            <NavLink to="/dashboard/userHome">
                                <FaHome></FaHome>
                                Delavary man Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/history">
                                <FaCalendar></FaCalendar>
                                Not History</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/cart">
                                <FaShoppingCart></FaShoppingCart>
                                My Cart </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/review">
                                <FaAd></FaAd>
                                Add a Review</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/paymentHistory">
                                <FaList></FaList>
                                Real Payment History</NavLink>
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
                        <li>
                            <NavLink to="/order/salad">
                                <FaSearch></FaSearch>
                                Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="/order/contact">
                                <FaEnvelope></FaEnvelope>
                                Contact</NavLink>
                        </li>
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;