import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
    error: null,
    commissionData: null,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
      state.commissionData = action.payload; // Store response data
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
      state.error = action.payload; // Store error message
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      "https://auction-plateform-ubyc.onrender.com/api/v1/commission/proof",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong!";
    dispatch(commissionSlice.actions.postCommissionProofFailed(errorMessage));
    toast.error(errorMessage);
  }
};

export default commissionSlice.reducer;
