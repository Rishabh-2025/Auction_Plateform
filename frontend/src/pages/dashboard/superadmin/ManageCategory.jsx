import { Avatar, Modal, Box, TextField, Button, Typography } from "@mui/material";
import { deleteCategory, fetchCategories, updateCategory } from "../../../store/slices/categorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../custom-component/Spinner";
import { motion } from "framer-motion";

const ManageCategories = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({ id: "", title: "", description: "" });

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleOpenModal = (cat) => {
    setEditData({ id: cat._id, title: cat.title, description: cat.description });
    setOpen(true);
  };

  const handleUpdate = () => {
    const updated = {
      title: editData.title,
      description: editData.description,
    };
    dispatch(updateCategory(editData.id, updated));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="overflow-x-auto mb-10 mt-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Manage Your Categories</h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
        <table className="min-w-full bg-white border-gray-300 rounded-xl shadow-md">
          <thead className="bg-[#0099A8] text-white">
            <tr>
              <th className="py-2 px-4 text-center">Image</th>
              <th className="py-2 px-4 text-center">Title</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#0099A8] font-semibold">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat._id} className="border-b-1 border-[#0099A8] text-center">
                  <td className="py-2 px-4 flex justify-center">
                    <Avatar src={cat.categoryImage?.url} alt={cat.title} />
                  </td>
                  <td className="py-2 px-4">{cat.title}</td>
                  <td className="py-2 px-4 flex space-x-2 justify-center">
                    <button
                      onClick={() => handleOpenModal(cat)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-300"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] mx-auto mt-20"
          component={motion.div}
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h5" className="text-[#0099A8] mb-4">Update Category</Typography>
          <TextField
            label="Title"
            fullWidth
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            margin="normal"
          />
          <Box className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">Cancel</Button>
            <Button onClick={handleUpdate} variant="contained" style={{ backgroundColor: "#0099A8", color: "white" }}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageCategories;
