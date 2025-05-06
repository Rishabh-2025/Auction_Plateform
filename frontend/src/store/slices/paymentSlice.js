import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    bidderPayments: [],
    allPayments: [],
    auctioneerReceipts: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state) {
      state.loading = false;
    },
    failure(state) {
      state.loading = false;
    },
    setBidderPayments(state, action) {
      state.loading = false;
      state.bidderPayments = action.payload;
    },
    setAllPayments(state, action) {   // <-- renamed to match component use
        state.loading = false;
        state.allPayments = action.payload;
      },
    setAuctioneerReceipts(state, action) {
      state.loading = false;
      state.auctioneerReceipts = action.payload;
    },
  },
});

// Async Actions

export const initiateBidderPayment = (auctionId) => async (dispatch) => {
    dispatch(paymentSlice.actions.request());
    try {
      const res = await axios.post(
        `https://auction-plateform-ubyc.onrender.com/api/v1/payment/bidder/pay/${auctionId}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(paymentSlice.actions.success());
      return res.data; // return Razorpay init data
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment initiation failed");
      dispatch(paymentSlice.actions.failure());
      return null;
    }
  };
  

export const verifyBidderPayment = (auctionId, data) => async (dispatch) => {
  dispatch(paymentSlice.actions.request());
  try {
    const res = await axios.post(
      `https://auction-plateform-ubyc.onrender.com/api/v1/payment/bidder/verify/${auctionId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    toast.success(res.data.message);
    dispatch(paymentSlice.actions.success());
  } catch (err) {
    toast.error(err.response?.data?.message || "Verification failed");
    dispatch(paymentSlice.actions.failure());
  }
};

export const fetchBidderPayments = () => async (dispatch) => {
  dispatch(paymentSlice.actions.request());
  try {
    const res = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/payment/admin/bidder-payments", {
      withCredentials: true,
    });
    dispatch(paymentSlice.actions.setBidderPayments(res.data.payments));
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to fetch bidder payments");
    dispatch(paymentSlice.actions.failure());
  }
};

export const fetchAllPaymentStatuses = () => async (dispatch) => {
    dispatch(paymentSlice.actions.request());
    try {
      const res = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/payment/admin/payouts", {
        withCredentials: true,
      });
      dispatch(paymentSlice.actions.setAllPayments(res.data.auctions));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch pending payouts");
      dispatch(paymentSlice.actions.failure());
    }
  };
  

export const payAuctioneer = (auctionId) => async (dispatch) => {
  dispatch(paymentSlice.actions.request());
  try {
    const res = await axios.post(
      `https://auction-plateform-ubyc.onrender.com/api/v1/payment/admin/pay-auctioneer/${auctionId}`,
      {},
      { withCredentials: true }
    );
    toast.success(res.data.message);
    dispatch(paymentSlice.actions.success());
  } catch (err) {
    toast.error(err.response?.data?.message || "Payment to auctioneer failed");
    dispatch(paymentSlice.actions.failure());
  }
};

export const fetchAuctioneerReceipts = () => async (dispatch) => {
  dispatch(paymentSlice.actions.request());
  try {
    const res = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/payment/auctioneer/receipts", {
      withCredentials: true,
    });
    dispatch(paymentSlice.actions.setAuctioneerReceipts(res.data.receipts));
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to fetch receipts");
    dispatch(paymentSlice.actions.failure());
  }
};

export default paymentSlice.reducer;
