import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import Spinner from "../custom-component/Spinner";
import { FaGreaterThan } from "react-icons/fa";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || user?.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full px-5 pt-28 flex flex-col bg-slate-200 min-h-screen"
    >
      {/* Breadcrumbs */}
      <div className="text-[16px] flex flex-wrap gap-2 items-center text-[#0099A8] font-semibold mb-4">
        <Link to="/" className="hover:text-white/70 transition">Home</Link>
        <FaGreaterThan className="text-gray-500" />
        <Link to="/auction" className="hover:text-white/70 transition">Auctions</Link>
        <FaGreaterThan className="text-gray-500" />
        <Typography variant="h6" className="text-gray-700">{auctionDetail.title}</Typography>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Box className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Left: Item Detail */}
          <Paper className="flex-1 p-5 shadow-lg rounded-xl bg-white">
            <Typography variant="h4" className="text-[#0099A8] text-center font-bold mb-6">
              {auctionDetail.title}
            </Typography>
            <img
              src={auctionDetail.image?.url}
              alt={auctionDetail.title}
              className="rounded-lg shadow-lg max-h-60 mx-auto"
            />
            <Typography variant="h6" className="mt-4">
              Condition: <span className="text-[#0099A8] font-semibold">{auctionDetail.condition}</span>
            </Typography>
            <Typography variant="h6">
              Minimum Bid: <span className="text-[#0099A8] font-semibold">Rs.{auctionDetail.startingBid}</span>
            </Typography>
            <Typography variant="h6" className="mt-8 font-semibold">Auction Item Description</Typography>
            <hr className="my-3 border-gray-400" />
            {auctionDetail.description &&
              auctionDetail.description.split(". ").map((item, i) => (
                <Typography key={i} className="text-gray-700 leading-8 p-1 text-lg">
                  <span className="font-extrabold">• </span>{item}
                </Typography>
              ))}
          </Paper>

          {/* Right: Bids */}
          <Paper className="flex-1 shadow-2xl rounded-xl bg-white/80 flex flex-col">
            <Typography variant="h5" className="bg-[#0099A8] text-white p-4 rounded-t-xl">
              BIDS
            </Typography>
            <Box className="p-4 flex-grow min-h-[400px] overflow-y-auto">
              {auctionBidders && auctionBidders.length > 0 &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.map((bidder, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={bidder?.profileImage}
                        alt={bidder?.userName}
                        className="w-12 h-12 rounded-full"
                      />
                      <Typography>{bidder.userName}</Typography>
                    </div>
                    <Typography className="font-bold text-gray-800">
                      Rs.{bidder.amount}
                    </Typography>
                    <Typography
                      className={`font-semibold ${
                        index === 0
                          ? "text-green-600"
                          : index === 1
                          ? "text-blue-600"
                          : index === 2
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {index === 0
                        ? "1st"
                        : index === 1
                        ? "2nd"
                        : index === 2
                        ? "3rd"
                        : `${index + 1}th`}
                    </Typography>
                  </motion.div>
                ))
              ) : (
                <Typography className="text-center text-gray-500 py-4">
                  No bids available or auction not active
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </motion.section>
  );
};

export default ViewAuctionDetails;
