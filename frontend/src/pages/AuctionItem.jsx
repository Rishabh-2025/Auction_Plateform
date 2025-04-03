import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import { placeBid } from "../store/slices/bidSlice";
import Spinner from "../custom-component/Spinner";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);
  
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-5 pt-28 flex flex-col bg-slate-200 min-h-screen"
    >
      <div className="text-[16px] flex flex-wrap gap-2 items-center text-[#0099A8] font-semibold">
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
          <Paper className="flex-1 p-4 shadow-lg rounded-xl bg-blue-500">
            <Typography variant="h4" className="text-[#0099A8] text-center py-5 font-bold">
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
            <Typography variant="h6" className="mt-4">Auction Item Description</Typography>
            <hr className="my-3 border-gray-400" />
            {auctionDetail.description && auctionDetail.description.split(". ").map((element, index) => (
              <Typography key={index} className="text-gray-700 leading-10 p-1 text-lg"> <span className="font-extrabold font-  ">• </span>{element}</Typography>
            ))}
          </Paper>

          <Paper className="flex-1 shadow-2xl rounded-2xl bg-white/70 flex flex-col ">
            <Typography variant="h5" className="bg-[#0099A8]  text-white p-4 rounded-t-lg">
              BIDS
            </Typography>
            <Box className="p-4 flex-grow min-h-64   overflow-y-auto">
              {auctionBidders && auctionBidders.length > 0 ? (
                auctionBidders.map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2 border-b border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar src={element?.profileImage} alt={element?.userName} className="w-12 h-12 rounded-full" />
                      <Typography>{element.userName}</Typography>
                    </div>
                     {index === 0 ? (
                            <p className="text-[20px] font-semibold text-green-600">
                              1st
                            </p>
                          ) : index === 1 ? (
                            <p className="text-[18px] font-semibold text-blue-600">
                              2nd
                            </p>
                          ) : index === 2 ? (
                            <p className="text-[16px] font-semibold text-yellow-600">
                              3rd
                            </p>
                          ) : (
                            <p className="text-[16px] font-semibold text-gray-600">
                              {index + 1}th
                            </p>
                          )}
                  </motion.div>
                ))
              ) : (
                <Typography className="text-center text-gray-500 py-4">
                  No bids for this auction
                </Typography>
              )}
            </Box>

            {Date.now() >= new Date(auctionDetail.startTime) && Date.now() <= new Date(auctionDetail.endTime) && (
              <Box className="bg-[#0099A8] p-4 flex items-center justify-between rounded-b-xl mt-auto">
                <label htmlFor="Place Bid" className=" text-slate-200 font-bold text-3xl">Place Bid</label>
                <div className="flex  gap-2 ">
                <input
                  type="number"
                  label="Place Bid"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/80 p-1 rounded-sm w-28" 
                />
                <button className="bg-white/80 p-2 rounded-sm shadow-md w-16 flex justify-center hover:bg-white/60 cursor-pointer" onClick={handleBid}>
                  <RiAuctionFill className="text-[#0099A8]" fontSize={"15px"}/>
                </button>
                </div>
              
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </motion.section>
  );
};

export default AuctionItem;