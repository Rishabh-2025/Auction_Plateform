import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categorySlice";
import CategoryCard from "./CategoryCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [slidePercentage, setSlidePercentage] = useState(100);

  useEffect(() => {
    dispatch(fetchCategories());

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
    return <p className="text-center text-lg font-semibold">Loading categories...</p>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 5 }}
      className="container mx-auto py-16 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-600 uppercase tracking-widest">
        Discover a Variety of Exciting Categories
      </h2>
      <h3 className="text-4xl font-extrabold text-center text-[#0099A8] ">
        Explore a wide range of auction categories tailored for every bidder.
      </h3>

      {categories.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-12"
        >
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showIndicators ={false}
            centerMode={true}
            centerSlidePercentage={slidePercentage}
            className="mx-auto max-w-6xl"
          >
            {categories.map((category) => (
              <motion.div 
                key={category._id} 
                className="px-4 h-[450px] py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </Carousel>
        </motion.div>
      ) : (
        <p className="text-center col-span-full">No categories found.</p>
      )}
    </motion.div>
  );
};

export default CategorySection;
