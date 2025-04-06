import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems } from "../store/slices/auctionSlice";
import { motion } from "framer-motion";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import AuctionCard from "../custom-component/AuctionCard";
import { fetchCategories } from "../store/slices/categorySlice";

const Auction = () => {
  const dispatch = useDispatch();
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const { categories } = useSelector((state) => state.category);

  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getAllAuctionItems());
  }, [dispatch]);

  useEffect(() => {
    let filtered = allAuctions;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((auction) => selectedCategories.includes(auction.category));
    }
    if (searchQuery) {
      filtered = filtered.filter((auction) => auction.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredAuctions(filtered);
  }, [allAuctions, searchQuery, selectedCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading auctions...</p>;
  }

  return (
  <div className="mt-16 w-full p-4 sm:p-8">
      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center my-8 gap-4">
        {/* Search Bar */}
        <div className="flex w-full sm:w-[40%] md:w-[20%] bg-white/70 shadow-xl pl-5 py-3 rounded-lg">
          <div className="relative w-full">
            <FaSearch className="absolute left-2 top-3 text-[#0099A8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-[16px] py-2 pl-8 bg-transparent text-[#0099A8] focus:outline-none w-full"
              placeholder="Search by title..."
            />
          </div>
        </div>
        
        {/* Title */}
        <div className="flex w-full sm:w-[60%] md:w-[80%] bg-white/70 shadow-xl pl-5 py-3 justify-center rounded-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#0099A8] uppercase tracking-widest">Auctions For Today</h2>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row p-2 gap-5">
        {/* Category Filter */}
        <div className="flex flex-col w-full md:w-[30%] lg:w-[20%] bg-white/70 shadow-xl p-5 text-[#0099A8] rounded-lg">
          <h2 className="text-lg font-semibold text-center mb-6 text-[#0099A8] tracking-widest">Category Filter</h2>
          {categories.map((category, index) => (
            <FormControlLabel
              key={`${category}-${index}`}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.title)}
                  onChange={() => handleCategoryChange(category.title)}
                />
              }
              label={category.title}
            />
          ))}
        </div>
        
        {/* Auction Items Grid */}
        <div className="flex-1 ">
          {filteredAuctions.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
            >
              {filteredAuctions.slice(0, 9).map((auction) => (
                auction._id && (
                  <motion.div
                    key={auction._id}
                    className="p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AuctionCard
                      title={auction.title}
                      imgSrc={auction.image?.url || "default-image.jpg"}
                      startTime={auction.startTime}
                      endTime={auction.endTime}
                      startingBid={auction.startingBid}
                      id={auction._id}
                    />
                  </motion.div>
                )
              ))}
            </motion.div>
          ) : (
            <p className="text-center col-span-full text-lg font-semibold text-gray-600">No auctions available.</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default Auction;
