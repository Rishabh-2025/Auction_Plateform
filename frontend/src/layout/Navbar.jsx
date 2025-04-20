import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
// import Contactus from "./Contactus";


const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    
    // const [openContact, setOpenContact] = useState(false);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleMouseLeave();
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div
                onClick={() => setShow(!show)}
                className="fixed right-5 top-5 bg-[#0099A8] text-white text-3xl p-2 rounded-md hover:bg-[#007a85] lg:hidden cursor-pointer z-50"
            >
                <GiHamburgerMenu />
            </div>

            {/* Navbar Container */}
            <div className="w-full h-20 fixed top-0 bg-white shadow-lg flex items-center justify-around px-6 border-b  border-gray-300 z-40">

                {/* Logo Section */}
                <div className="flex items-center gap-2 pr-28 " >
                    <img src="/images/logo.gif" alt="Logo" className="w-14 h-14" />
                    <h2 className="text-3xl font-bold text-[#0099A8]">Bid Palace</h2>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-10 text-[18px] text-gray-600">
                    {[
                        { label: "Home", href: "/" },
                        { label: "About Us", href: "/about-us" },
                        { label: "Blog", href: "/blog" },
                        { label: "Auction", href: "/auction" },
                        { label: "Contact us", href: "/contact-us" },
                      
                    ].map((item, index) => (
                        <li key={index} className="hover:text-[#0099A8] transition-all duration-200 cursor-pointer">
                        <Link to={item.href}>{item.label}</Link>
                            
                           
                        </li>
                    ))}
                     {/* <li>
                        <button onClick={() => setOpenContact(true)} className="hover:text-[#0099A8] transition-all duration-200 cursor-pointer">
                            Contact Us
                        </button>
                    </li> */}
                </ul>
                {/* <Contactus open={openContact} handleClose={() => setOpenContact(false)} /> */}
                {/* Auth Links */}
                <div className="hidden lg:flex items-center gap-4">
                    {isAuthenticated ? (
                        
                        <div
                            className="relative flex items-center gap-4"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >

                            <Typography className="text-gray-700 font-medium">{user.userName}</Typography>

                            {/* Avatar Dropdown */}
                            <Avatar alt={user?.profileImage?.url} src={user?.profileImage?.url} className="cursor-pointer" />

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMouseLeave}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                <MenuItem className="hover:bg-[#0099A8] hover:text-[#0099A8]  transition-all">
                                    <ListItemIcon className="text-[#0099A8] group-hover:text-[#0099A8]">
                                        <DashboardIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/dashboard" className="text-gray-700 hover:text-[#0099A8]  w-full py-2 px-1">Dashboard</Link>
                                </MenuItem>
                              

                                <MenuItem className="hover:bg-[#0099A8] hover:text-[#0099A8]  transition-all">
                                    <ListItemIcon className="text-[#0099A8] group-hover:text-[#0099A8] ">
                                        <LeaderboardIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/leaderboard" className="text-gray-700 hover:text-[#0099A8] w-full  py-2 px-1">Leaderboard</Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem onClick={handleLogout} className="hover:bg-[#0099A8] hover:text-white transition-all">
                                    <ListItemIcon className="text-[#0099A8] group-hover:text-[#0099A8]">
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    <span className="hover:text-[#0099A8] py-2 px-1">Logout</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <>


<button
                                onClick={() => setOpenSignIn(true)}
                                className="bg-[#0099A8] text-white px-6 py-2 rounded-full hover:bg-[#007a85] transition"
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => setOpenSignUp(true)}
                                className="border border-[#0099A8] text-[#0099A8] px-6 py-2 rounded-full hover:bg-[#0099A8] hover:text-white transition"
                            >
                                Sign Up
                            </button>

                            {/* SignIn and SignUp Modals */}
                            <SignIn open={openSignIn} handleClose={() => setOpenSignIn(false)} openSignUpModal={() => setOpenSignUp(true)} />
                            <SignUp open={openSignUp} handleClose={() => setOpenSignUp(false)} openSignInModal={() => setOpenSignIn(true)} />

                            {/* <SignIn open={openSignIn} handleClose={() => setOpenSignIn(false)} /> */}
                            {/* <SignUp open={openSignUp} handleClose={() => setOpenSignUp(false)} /> */}

                        </>
                    )}
                </div>

            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-[80%] h-screen bg-white shadow-lg transform ${show ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 flex flex-col items-center pt-20 lg:hidden z-50`}
            >
                <ul className="flex flex-col gap-8 text-[20px] text-gray-600">
                    {[
                        { label: "Home", href: "/" },
                        { label: "About Us", href: "/about-us" },
                        { label: "Blog", href: "/blog" },
                        { label: "Auction", href: "/auction" },
                        { label: "Contact Us", href: "/contact-us" },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="hover:text-[#0099A8] transition-all duration-200 cursor-pointer"
                        >
                            <Link to={item.href} onClick={() => setShow(false)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Auth Links */}
                <div className="flex flex-col gap-4 mt-10">
                    {isAuthenticated ? (
                        <>
                            <Typography className="text-gray-700 font-medium">{user.userName}</Typography>

                            <Avatar
                                alt={user?.profileImage?.url}
                                src={user?.profileImage?.url}
                                className="cursor-pointer"
                            />

                            <Link
                                to="/dashboard"
                                className="border border-[#0099A8] text-[#0099A8] px-6 py-2 rounded-full hover:bg-[#0099A8] hover:text-white transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/leaderboard"
                                className="border border-[#0099A8] text-[#0099A8] px-6 py-2 rounded-full hover:bg-[#0099A8] hover:text-white transition"
                            >
                                Leaderboard
                            </Link>

                            <Link
                                to="/logout"
                                onClick={handleLogout}
                                className="bg-[#0099A8] text-white px-6 py-2 rounded-full hover:bg-[#007a85] transition"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="border border-[#0099A8] text-[#0099A8] px-6 py-2 rounded-full hover:bg-[#0099A8] hover:text-white transition">Sign In</Link>
                            <Link to="/signup" className="bg-[#0099A8] text-white px-6 py-2 rounded-full hover:bg-[#007a85] transition">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
