import { createAuction } from "../../../store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import { FaTag, FaClipboardList, FaRegStickyNote, FaCalendarAlt, FaCamera, FaDollarSign } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCategories } from "../../../store/slices/categorySlice";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { categories } = useSelector((state) => state.category);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());


    if (!isAuthenticated || !(user.role === "Auctioneer" || user.role === "Super Admin")) {
        navigateTo("/");
    }
}, [isAuthenticated, user, dispatch, navigateTo]);


  const imageHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          setImage(file);
          setImagePreview(reader.result);
      };
  };

  const handleCreateAuction = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("condition", condition);
      formData.append("startingBid", startingBid);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      dispatch(createAuction(formData));
  };


  return (
    <div className="bg-white/70 border border-white/30 rounded-lg p-8 shadow-lg max-w-3xl mx-auto ">
      <h1 className="text-[#0099A8] text-3xl font-bold text-center mb-6">Create Auction</h1>
      <form className="flex flex-col gap-5" onSubmit={handleCreateAuction}>
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Title</label>
            <div className="relative">
              <FaTag className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[16px] py-2 pl-8 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Category</label>
            <div className="relative">
              <FaClipboardList className="absolute left-2 top-3 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-[16px] py-2 pl-8 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>{cat.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Condition & Starting Bid */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="text-[16px] py-2 pl-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Starting Bid</label>
            <div className="relative">
              <FaDollarSign className="absolute left-2 top-3 text-gray-400" />
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="text-[16px] py-2 pl-8 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col relative">
          <label className="text-gray-600 text-[16px]">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="text-[16px] py-2 px-2 bg-transparent border-[1px] rounded-md border-gray-400 focus:outline-none"
          />
        </div>

        {/* Start & End Time */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Auction Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-1 relative">
            <label className="text-gray-600 text-[16px]">Auction End Time</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
            <label className="font-semibold text-xl md:text-2xl text-[#0099A8]">
              Auction Item Image
            </label>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 flex flex-col items-center bg-slate-200 justify-center w-full h-64 border-2 border-[#0099A8] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  {imagePreview ? (
                    <img src={imagePreview} alt={title} className="w-44 h-auto"/>
                  ) : (
                    <>
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </>
                  )}

                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={imageHandler}/>
              </label>
            </div>
          </div>
        {/* Submit Button */}
        <button className="bg-[#0099A8] text-white p-3 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer w-full">
          {loading ? "Creating Auction..." : "Create Auction"}
        </button>
      </form>
    </div>

  );
};

export default CreateAuction;