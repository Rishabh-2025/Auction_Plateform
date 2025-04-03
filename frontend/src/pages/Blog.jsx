import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const Blog = () => {
  const steps = [
    {
      icon: <FaUser />, title: "User Registration",
      description: "Register to post auctions, bid on items, and manage transactions."
    },
    {
      icon: <FaGavel />, title: "Role Selection",
      description: "Choose to be a Bidder or Auctioneer and start participating in auctions."
    },
    {
      icon: <FaEnvelope />, title: "Winning Bid Notification",
      description: "Winners receive email notifications with payment details."
    },
    {
      icon: <FaDollarSign />, title: "Commission Payment",
      description: "Auctioneers pay a 5% commission upon successful transactions."
    },
    {
      icon: <FaFileInvoice />, title: "Proof of Payment",
      description: "Submit payment proof to validate transactions."
    },
    {
      icon: <FaRedo />, title: "Reposting Items",
      description: "If payment fails, Auctioneers can relist items for free."
    },
  ];

  return (
    <section className="w-full min-h-screen px-5 py-20 flex flex-col lg:flex-row items-center gap-16">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <img
          src="./images/blog.jpeg"
          alt="Auction Illustration"
          className="w-full max-w-lg h-auto rounded-xl shadow-xl object-cover"
        />
      </motion.div>

      {/* Steps Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
      <motion.h1
              className="text-[#0099A8] text-3xl md:text-4xl lg:text-6xl pb-5 font-bold leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 5 }}
            >
          How Our Auction System Works
        </motion.h1>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6 flex gap-4 items-center hover:bg-[#095b63] transition-all duration-300 cursor-pointer"
          >
            <div className="bg-[#0099A8] text-white p-4 text-2xl rounded-full w-fit hover:bg-white hover:text-[#095b63] transition-all duration-300">
              {step.icon}
            </div>
            <div>
              <h3 className="text-[#0099A8] text-xl font-semibold hover:text-white transition-all duration-300">
                {step.title}
              </h3>
              <p className="text-md text-gray-600 hover:text-white transition-all duration-300">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;