import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../custom-component/Spinner";
import {
  fetchContacts,
  replyToContact,
} from "../../../store/slices/messageSlice";
import { motion } from "framer-motion";

const ManageMessages = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.message);

  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const unrepliedMessages = contacts?.filter((msg) => !msg.replied);
console.log(contacts);

  const handleOpenModal = (msg) => {
    setSelectedMessage(msg);
    setReply("");
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedMessage(null);
    setReply("");
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;

    dispatch(replyToContact({ id: selectedMessage._id, reply }));
    handleCloseModal();
  };

  return (
    <div className="overflow-x-auto mb-10 mt-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Answer User's Queries</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
        <table className="min-w-full bg-white border-gray-300 rounded-xl shadow-md">
          <thead className="bg-[#0099A8] text-white">
            <tr>
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Subject</th>
              <th className="py-2 px-4 text-center">Message</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#0099A8] font-semibold">
            {unrepliedMessages?.length > 0 ? (
              unrepliedMessages.map((msg) => (
                <tr key={msg._id} className="border-b-1 border-[#0099A8] text-center">
                  <td className="py-2 px-4">{msg.name}</td>
                  <td className="py-2 px-4">{msg.email}</td>
                  <td className="py-2 px-4">{msg.subject}</td>
                  <td className="py-2 px-4 max-w-xs truncate">{msg.message}</td>
                  <td className="py-2 px-4 flex justify-center">
                    <button
                      onClick={() => handleOpenModal(msg)}
                      className="bg-[#0099A8] text-white py-1 px-3 cursor-pointer  rounded-md hover:bg-[#0099D8] transition-all duration-300"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No unreplied messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] mx-auto mt-20"
          component={motion.div}
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h5" className="text-[#0099A8] mb-4">
            Reply to Message
          </Typography>
          <Typography className="mb-2">
            <strong>From:</strong> {selectedMessage?.email}
          </Typography>
          <Typography className="mb-4 italic">{selectedMessage?.message}</Typography>
          <TextField
            label="Reply"
            fullWidth
            multiline
            rows={4}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            margin="normal"
          />
          <Box className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSendReply}
              variant="contained"
              style={{ backgroundColor: "#0099A8", color: "white" }}
            >
              Send Reply
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageMessages;
