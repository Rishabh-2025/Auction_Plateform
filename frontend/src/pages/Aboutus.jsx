import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full mt-10 mb-10 px-5 pt-20 flex gap-10 flex-col lg:flex-row items-center text-center lg:text-left min-h-screen relative">
           {/* Content Section */}
           <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pl-16">
      <motion.h1
              className="text-[#0099A8] text-3xl md:text-4xl lg:text-6xl pb-5 font-bold leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 5 }}
            >About Us</motion.h1>
        <p className="text-lg md:text-xl text-stone-600 mt-4 max-w-3xl">
          Welcome to <span className="font-semibold text-[#0099A8]">Bid Palace</span>, your premier destination for online auctions.
          Our platform brings together buyers and sellers in a fast, secure, and engaging marketplace.
        </p>

        <h3 className="text-[#0099A8] text-3xl font-semibold mt-10">Our Mission</h3>
        <p className="text-lg md:text-xl text-stone-600 mt-2">
          We aim to redefine online auctions by providing a seamless and transparent experience.
          Our platform ensures competitive bidding, secure transactions, and a user-friendly experience for everyone.
        </p>

        <h3 className="text-[#0099A8] text-3xl font-semibold mt-10">Our Values</h3>
        <ul className="text-lg md:text-xl text-stone-600 mt-2 space-y-2">
          <li><strong>Integrity:</strong> We foster trust through transparency and fairness in every auction.</li>
          <li><strong>Innovation:</strong> Our cutting-edge technology enhances the auction experience.</li>
          <li><strong>Community:</strong> We connect passionate buyers and sellers from around the world.</li>
          <li><strong>Customer Focus:</strong> Exceptional support and guidance for all users.</li>
        </ul>

        <h3 className="text-[#0099A8] text-3xl font-semibold mt-10">Our Story</h3>
        <p className="text-lg md:text-xl text-stone-600 mt-2">
          Founded by Bid Palace team, Bid Palace emerged from a passion for online commerce.
          We bring years of auction expertise to create an innovative, exciting, and reliable platform.
        </p>

        <h3 className="text-[#0099A8] text-3xl font-semibold mt-10">Join Us</h3>
        <p className="text-lg md:text-xl text-stone-600 mt-2">
          Become part of our growing community. Buy, sell, and explore a world of possibilities with Bid Palace.
        </p>

        <p className="text-[#0099A8] text-xl font-bold mt-6">
          Thank you for choosing Bid Palace. Let’s make every auction unforgettable!
        </p>
      </div>

      {/* Image Collage */}
      <div className="relative w-full  sm:ml-36 sm:w-1/3 h-[700px] flex justify-center">
        <motion.div
          className="absolute top-0 left-2 w-60 h-60 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-40"
          animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src="/images/about1.jpeg" alt="about1" className="w-full h-full object-cover rounded-lg" />
        </motion.div>

        <motion.div
          className="absolute top-24 right-10 w-64 h-64 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-30"
          animate={{ x: [0, -10, 10, 0], y: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <img src="/images/about2.jpeg" alt="about2" className="w-full h-full object-cover rounded-lg" />
        </motion.div>

        <motion.div
          className="absolute top-48 left-20 w-72 h-72 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-20"
          animate={{ x: [0, 15, -15, 0], y: [0, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        >
          <img src="/images/about3.jpeg" alt="about3" className="w-full h-full object-cover rounded-lg" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-16 w-64 h-64 bg-white shadow-xl rounded-xl flex items-center justify-center p-5 z-10"
          animate={{ x: [0, -15, 15, 0], y: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src="/images/bg2.jpeg" alt="about4" className="w-full h-full object-cover rounded-lg" />
        </motion.div>
      </div>

 
    </section>
  );
};

export default About;