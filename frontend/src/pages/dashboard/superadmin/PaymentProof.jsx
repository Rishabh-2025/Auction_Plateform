import {
  clearAllSuperAdminSliceErrors,
    deletePaymentProof,
    getAllPaymentProofs,
    getSinglePaymentProofDetail,
    updatePaymentProof,
  } from "../../../store/slices/superAdminSlice";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import {
    Modal,
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
  } from "@mui/material";
  
  const PaymentProofs = () => {
    const { paymentProofs, singlePaymentProof,loading } = useSelector(
      (state) => state.superAdmin
    );
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
  
    const handlePaymentProofDelete = (id) => {
      dispatch(deletePaymentProof(id));
    };
  
    const handleFetchPaymentDetail = (id) => {
      dispatch(getSinglePaymentProofDetail(id));
    };
  
    useEffect(() => {
      if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
        setOpenModal(true);
      }
    }, [singlePaymentProof]);
    useEffect(() => {
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

    return (
      <>
        <div className="overflow-x-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Approve Payments</h2>
        {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
          <table className="min-w-full mt-5 bg-slate-200 text-[#0099A8] rounded-lg">
            <thead className="bg-[#0099A8] text-white">
              <tr>
                <th className="w-1/3 py-2">User ID</th>
                <th className="w-1/3 py-2">Status</th>
                <th className="w-1/3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#0099A8] font-medium">
              {paymentProofs.length > 0 ? (
                paymentProofs.map((element, index) => (
                  <tr key={index} className="border-b border-white/70">
                    <td className="py-2 px-4 text-center">{element.userId}</td>
                    <td className="py-2 px-4 text-center">{element.status}</td>
                    <td className="flex items-center py-4 justify-center gap-3">
                      <button
                        className="bg-[#0099A8] text-white py-1 px-3 rounded hover:bg-[#007c85] transition-all duration-300"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                        onClick={() => handlePaymentProofDelete(element._id)}
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
          </table>)}

        </div>
  
        <UpdatePaymentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </>
    );
  };
  
  export default PaymentProofs;
  
  const UpdatePaymentModal = ({ open, onClose }) => {
    const { singlePaymentProof, loading } = useSelector(
      (state) => state.superAdmin
    );
    const dispatch = useDispatch();
  
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (singlePaymentProof) {
        setAmount(singlePaymentProof.amount || "");
        setStatus(singlePaymentProof.status || "");
      }
    }, [singlePaymentProof]);
  
    const handleUpdate = () => {
      dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            maxWidth: 600,
            bgcolor: "white",
            p: 4,
            m: "auto",
            mt: "10vh",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "#0099A8", fontWeight: 600, mb: 1 }}
          >
            Update Payment Proof
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={3}>
            You can update payment status and amount.
          </Typography>
  
          <TextField
            fullWidth
            label="User ID"
            value={singlePaymentProof.userId || ""}
            disabled
            margin="normal"
            InputProps={{ style: { color: "#4A4A4A" } }}
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Settled">Settled</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Comment"
            multiline
            rows={4}
            value={singlePaymentProof.comment || ""}
            disabled
            margin="normal"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#0099A8",
              "&:hover": { backgroundColor: "#007c85" },
              fontWeight: 600,
              fontSize: "1rem",
            }}
            component={Link}
            to={singlePaymentProof.proof?.url || ""}
            target="_blank"
          >
            View Payment Proof (SS)
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#0099A8",
              "&:hover": { backgroundColor: "#007c85" },
              fontWeight: 600,
              fontSize: "1rem",
            }}
            onClick={handleUpdate}
          >
            {loading ? "Updating..." : "Update Payment Proof"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              color: "#0099A8",
              borderColor: "#0099A8",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#E2E8F0",
                borderColor: "#007c85",
                color: "#007c85",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  };
  