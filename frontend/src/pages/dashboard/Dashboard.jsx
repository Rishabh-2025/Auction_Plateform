import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlice";
import { FaUser, FaChartPie,FaWrench,FaCog, FaCreditCard ,FaFileInvoiceDollar,FaTrophy,FaWallet , FaGavel, FaEye, FaSignOutAlt,FaComments ,FaTable,FaChartBar  } from "react-icons/fa";
import CategoryIcon from '@mui/icons-material/Category';
import Profile from "./Profile";
import CreateCategories from './superadmin/CreateCategories'
import ViewMyAuction from "./auctionpage/ViewMyAuction";
import SubmitCommission from "./auctioner/SubmitCommission";
import CreateAuction from "./auctionpage/CreateAuction";
import PaymentGraph from "./superadmin/PaymentGraph";
import AuctionItemDelete from "./superadmin/AuctionItemDelete";
import PaymentProof from "./superadmin/PaymentProof";
import BidderAuction from "./superadmin/BiddersAuctioneersGraph";

import CategoryManage from "./superadmin/ManageCategory";
import ManageMessages from "./superadmin/ManageMessages";
import AuctionWon from "./bidder/AuctionWon";
import TotalSpent from "./bidder/TotalSpent";
import PaymentToAuctioneer from "./superadmin/PaymentToAuctioneer";



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading } = useSelector((state) => state.superAdmin);



  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const [activeComponent, setActiveComponent] = useState("Profile");

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/");
  };

  const menuItems = {
    auctioneer: [
      { name: "Profile", icon: <FaUser />, component: <Profile /> },
      { name: "Create Auction", icon: <FaGavel />, component: <CreateAuction /> },
      { name: "View My Auctions", icon: <FaEye />, component: <ViewMyAuction /> },
      { name: "Submit Commission", icon: <FaFileInvoiceDollar />, component: <SubmitCommission /> },
    ],
    superadmin: [
      { name: "Profile", icon: <FaUser />, component: <Profile /> },
      { name: "Create Auction", icon: <FaGavel />, component: <CreateAuction /> },
      { name: "Manage Auction", icon: <FaCog/>, component: <AuctionItemDelete /> },
      { name: "Create Category", icon: <CategoryIcon />, component: <CreateCategories /> },
      { name: "Manage Category", icon: <FaWrench />, component: <CategoryManage /> },
      { name: "View My Auctions", icon: <FaTable />, component: <ViewMyAuction /> },
      { name: "Messages", icon: <FaComments  />, component: <ManageMessages /> },
      { name: "Auctioneer Payout", icon: <FaCreditCard  />, component: <PaymentToAuctioneer /> },
      { name: "Payments Proof", icon: <FaEye />, component: <PaymentProof /> },
      { name: "Bidders", icon: <FaChartPie />, component: <BidderAuction /> },
      { name: "Revenue", icon: <FaChartBar  />, component: <PaymentGraph /> },
    ],
    bidder:[
      { name: "Profile", icon: <FaUser />, component: <Profile /> },
      { name: "Won Auctions", icon: <FaTrophy />, component: <AuctionWon /> },
      { name: "Wallet", icon: <FaWallet  />, component: <TotalSpent /> },
    ]
  };

  return (
    <div className="flex justify-center items-center  bg-gray-200">

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
                    className={`flex items-center gap-3 px-3 py-4 rounded-md transition-all duration-200 cursor-pointer w-full text-left
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
              className="flex items-center gap-3 px-3 py-4 cursor-pointer rounded-md transition-all duration-200 bg-red-600 text-white hover:bg-red-700 mt-6 w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Main Content Area - Dynamically Rendered Component */}
        {loading ?
          <Spinner /> : (
            <div className="flex-1 p-8">
              <div className=" p-6">
                {menuItems[user?.role?.toLowerCase().replace(/\s+/g, "")]?.find((item) => item.name === activeComponent)?.component || <Profile />}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
