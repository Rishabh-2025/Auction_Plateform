import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../store/slices/categorySlice";

const CreateCategories = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build FormData with matching keys
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryImage", image);      // ← must be "categoryImage"

    // Dispatch your thunk
    dispatch(createCategory(formData));
  };

  return (
    <div className="bg-white/50 border border-white/30 rounded-lg p-8 shadow-lg max-w-[60%] mx-auto mt-20">
      <h3 className="text-[#0099A8] text-2xl font-semibold text-center mb-6">
        Create Category
      </h3>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-2 border-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-gray-600">Image</label>
          <input
            type="file"
            onChange={imageHandler}
            className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0099A8] text-white p-3 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer w-full"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategories;
