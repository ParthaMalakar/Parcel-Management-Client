import {  Link, NavLink } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { MdNotifications } from "react-icons/md";
import { AuthContext } from "../../../provider/Authprovider";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, logOut } = useContext(AuthContext);
    const navLinks = <>
        <li><NavLink className="font-semibold text-lg" to="/">Home</NavLink></li>

        <li><NavLink className="font-semibold text-lg" to={isAdmin?'dashboard/statistics':'dashboard'}>Dashboard</NavLink></li>
        <li><NavLink className="font-semibold text-3xl" to="/notification"><MdNotifications></MdNotifications></NavLink></li>
        <li><NavLink className=" font-semibold text-lg" to="/about">About Us</NavLink></li>
    </>
    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    'Logout success!',
                    'You clicked the button!',
                    'success'
                )
            })
            .catch()
    }
    return (
        <div>
            <div className="navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="md:flex justify-center items-center">
                        <img className="h-10 md:ml-10 navbar-start rounded-xl" src={logo} alt="" />
                        <a className="  normal-case  md:text-2xl font-bold text-rose-500 md:ml-0"><i>SwiftParcelHub</i></a>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                {
                        user ? <div className=" md:flex items-center ">
                            <div className="dropdown mr-36">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <img  className="ml-40 md:ml-0 w-52 h-11 md:h-14 rounded-full" src={user.photoURL} alt="" />
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 mx-auto  z-[1] p-2 shadow bg-base-100 rounded-box w-44">
                                <p className="hover:bg-amber-300 font-semibold ml-3 p-2 mb-4 bg-gray-300 rounded-xl">{user.displayName}</p>
                                <NavLink className="hover:bg-amber-300 font-semibold ml-3 p-2 mb-4 bg-gray-300 rounded-xl" to="/dashboard">Dashboard</NavLink>
                                    <Link  onClick={handleSignOut} className="hover:bg-amber-300 font-semibold ml-3 p-2 mb-4 bg-gray-300 rounded-xl"><a> Log Out</a></Link>
                                </ul>
                            </div>
                        </div>

                            :
                            <Link to="/login" className="py-2 px-6 rounded-lg  bg-slate-600 text-white text-lg font-semibold mr-10">Login</Link>
                    }

                </div>

            </div>
        </div>
    );
};

export default Navbar;