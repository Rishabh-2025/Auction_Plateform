import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { FaUser, FaChartPie, FaFileInvoiceDollar, FaGavel, FaEye, FaSignOutAlt } from "react-icons/fa";
import CategoryIcon from '@mui/icons-material/Category';
import Profile from "./Profile";
import CreateCategories from './superadmin/CreateCategories'
import ViewMyAuction from "./auctionpage/ViewMyAuction";
import SubmitCommission from "./auctioner/SubmitCommission";
import CreateAuction from "./auctionpage/CreateAuction";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Default to "Profile" on load
  const [activeComponent, setActiveComponent] = useState("Profile");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Define the menu items and corresponding components
  const menuItems = {
    auctioneer: [
      { name: "Profile", icon: <FaUser />, component: <Profile /> },
      { name: "Create Auction", icon: <FaGavel />, component: <CreateAuction /> },
      { name: "View My Auctions", icon: <FaEye />, component: <ViewMyAuction /> },
      { name: "Submit Commission", icon: <FaFileInvoiceDollar />, component: <SubmitCommission/> },
    ],
    superadmin: [
      { name: "Profile", icon: <FaUser />, component: <Profile /> },
      { name: "Create Auction", icon: <FaGavel />, component: <CreateAuction /> },
      { name: "Create Category", icon: <CategoryIcon />, component: <CreateCategories /> },
      { name: "View My Auctions", icon: <FaEye />, component: <ViewMyAuction /> },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">

      <div className="flex w-full mt-20  ">
        {/* Sidebar */}
        <div className="w-80 shadow-lg bg-[#F8FAFC]  border-gray-300 rounded-l-lg p-8">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <img
              src={user?.profileImage?.url || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto border-2 border-white shadow-md"
            />
            {isAuthenticated && user && (
              <>
                <h2 className="text-lg font-bold mt-5">{user.userName}</h2>
                <p className="text-sm text-gray-500 py-1">{user.role}</p>
                <p className="text-sm text-gray-500 py-1">{user.email}</p>
                <p className="text-sm text-gray-500 py-1">{user.phone}</p>
              </>
            )}
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Navigation Links */}
          <ul className="space-y-2">
            {isAuthenticated &&
             menuItems[user?.role?.toLowerCase().replace(/\s+/g, "")]?.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveComponent(item.name)}
                    className={`flex items-center gap-3 px-3 py-4 rounded-md transition-all duration-200 w-full text-left
                      ${activeComponent === item.name ? "bg-[#0099A8] text-white" : "hover:bg-[#095b63] hover:text-white"}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
          </ul>

          {/* Logout Button */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-4 rounded-md transition-all duration-200 bg-red-600 text-white hover:bg-red-700 mt-6 w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Main Content Area - Dynamically Rendered Component */}
        <div className="flex-1 p-8">
          <div className=" p-6">
            { menuItems[user?.role?.toLowerCase().replace(/\s+/g, "")]?.find((item) => item.name === activeComponent)?.component || <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
