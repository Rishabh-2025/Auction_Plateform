import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import CategorySection from "../components/homepage/CategorySection";
import FeatureAuctions from "../components/Auction/FeatureAuction";


const Home = () => {
  return (
    <>
      <div className="max-h-screen flex justify-center mt-10 px-4 md:px-8">
        <div className="container flex flex-col lg:flex-row pt-32 md:h-[650px] justify-between gap-5">
          {/* Left Content Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              className="text-[#0099A8] text-3xl md:text-4xl lg:text-6xl pb-5 font-bold leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 5 }}
            >
              Bid on Exclusive Items with Confidence
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-gray-600 mt-4 py-2 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Discover rare finds, place your bids, and win amazing deals in a secure and thrilling auction experience.
            </motion.p>

            <motion.p
              className="text-sm md:text-lg lg:text-xl text-gray-600 mt-2 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              🔹 Unique Listings | 🔹 Competitive Bidding | 🔹 Secure Transactions
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start py-5">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/blog"
                  className="bg-[#0099A8] text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition-all duration-300 hover:bg-[#007a8a] hover:shadow-lg"
                >
                  Start Bidding Today
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/auction"
                  className="bg-white border border-[#0099A8] text-[#0099A8] px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition-all duration-300 hover:bg-[#0099A8] hover:text-white hover:shadow-lg"
                >
                  Explore Auctions
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Image Section (Hidden on Small Screens) */}
          <div className="relative w-full lg:w-1/3 h-[500px] md:h-[600px] flex justify-center hidden md:flex">
            <motion.div
              className="absolute top-0 left-2 w-40 md:w-60 h-40 md:h-60 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-10"
              animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img src="/images/about1.jpeg" alt="about1" className="w-full h-full object-cover rounded-lg" />
            </motion.div>

            <motion.div
              className="absolute top-20 md:top-24 left-40 md:left-72 w-40 md:w-60 h-40 md:h-60 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-30"
              animate={{ x: [0, -10, 10, 0], y: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <img src="/images/about2.jpeg" alt="about2" className="w-full h-full object-cover rounded-lg" />
            </motion.div>

            <motion.div
              className="absolute top-36 md:top-48 left-10 md:left-20 w-52 md:w-72 h-52 md:h-72 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-20"
              animate={{ x: [0, 15, -15, 0], y: [0, -15, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <img src="/images/bg2.jpeg" alt="about3" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-slate-200 mt-10 ">
        <CategorySection />
      </div>

      <div className="bg-black text-slate-200 py-20 px-6 flex flex-col md:flex-row items-center gap-10">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative md:w-1/2 flex justify-center"
        >
          <div className=" rounded-lg p-6 relative w-full max-w-sm flex items-center justify-center">
            <img
              src="/images/auctioner1.png"
              alt="Auctioner"
              width={300}
              height={400}
              className="rounded-lg"
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 5 }}
              className="absolute bottom-4 right-4"
            >
              <img
                src="/images/book.png"
                alt="Book"
                width={60}
                height={60}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section with Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left px-4"
        >
          <motion.h1
            className="text-[#0099A8] text-3xl md:text-4xl lg:text-6xl pb-5 font-bold leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 5 }}
          >Live Auctions</motion.h1>
          <h2 className="text-4xl font-bold text-white mt-2 leading-tight">
            Bid on exclusive items now!
          </h2>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-600 mt-4 py-2 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Participate in live auctions and get a chance to win unique and valuable items.
            Place your bids now before time runs out!
          </motion.p>

          <motion.p className="text-base md:text-lg lg:text-xl text-gray-600 mt-4 py-2 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}>
            Secure, fast, and transparent bidding experience for all users.
          </motion.p>

          <motion.div

            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 5 }}
            className="mt-10"
          >
            <Link to={'/auction'} className="bg-[#0099A8] text-white mt-6 px-6 py-3 rounded-lg cursor-pointer">
              Place Bid
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="bg-slate-200 ">
        <FeatureAuctions/>
      </div>
    </>
  );
};

export default Home;
