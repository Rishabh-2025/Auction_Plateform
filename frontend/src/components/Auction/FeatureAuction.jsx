import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems } from "../../store/slices/auctionSlice";
import AuctionCard from "../../custom-component/AuctionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const FeatureAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [slidePercentage, setSlidePercentage] = useState(100);

  useEffect(() => {
    dispatch(getAllAuctionItems());

    const updateSlidePercentage = () => {
      if (window.innerWidth >= 1024) {
        setSlidePercentage(33.33); // 3 slides on lg
      } else if (window.innerWidth >= 768) {
        setSlidePercentage(50); // 2 slides on md
      } else {
        setSlidePercentage(100); // 1 slide on sm
      }
    };

    updateSlidePercentage();
    window.addEventListener("resize", updateSlidePercentage);
    return () => window.removeEventListener("resize", updateSlidePercentage);
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading auctions...</p>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto py-16 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-600 uppercase tracking-widest">
        Featured Auctions
      </h2>
      <h3 className="text-4xl font-extrabold text-center text-[#0099A8] ">
        Bid on exclusive items in our featured auctions.
      </h3>

      {allAuctions.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="p-10 "
        >
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            centerMode={true}
            centerSlidePercentage={slidePercentage}
            className="mx-auto max-w-6xl p-8"
          >
            {allAuctions.slice(0, 5).map((auction) => (
              <motion.div 
                key={auction._id} 
                className="px-4 h-[450px]  pt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AuctionCard
                  title={auction.title}
                  imgSrc={auction.image?.url}
                  startTime={auction.startTime}
                  endTime={auction.endTime}
                  startingBid={auction.startingBid}
                  id={auction._id}
                />
              </motion.div>
            ))}
          </Carousel>
        </motion.div>
      ) : (
        <p className="text-center col-span-full">No auctions available.</p>
      )}
    </motion.div>
  );
};

export default FeatureAuctions;