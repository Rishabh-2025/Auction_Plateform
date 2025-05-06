import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    leaderboard: [],
    wonAuctions: [],

  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    fetchUserRequest(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed(state) {
      state.loading = false;
    },
    fetchLeaderboardRequest(state) {
      state.loading = true;
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state) {
      state.loading = false;
      state.leaderboard = [];
    },
    editProfileRequest(state) {
      state.loading = true;
    },
    editProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload; 
    },
    editProfileFailed(state) {
      state.loading = false;
    }, 
    fetchWonAuctionsRequest(state) {
      state.loading = true;
    },
    fetchWonAuctionsSuccess(state, action) {
      state.loading = false;
      state.wonAuctions = action.payload;
    },
    fetchWonAuctionsFailed(state) {
      state.loading = false;
      state.wonAuctions = [];
    },
      
    clearAllErrors(state) {
      state.loading = false;
    },
  },
});

// Async actions
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "https://auction-plateform-ubyc.onrender.com/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response?.data?.message || "Registration failed.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "https://auction-plateform-ubyc.onrender.com/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Login failed.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://auction-plateform-ubyc.onrender.com/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response?.data?.message || "Logout failed.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    toast.error(error.response?.data?.message || "Failed to fetch user data.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      "https://auction-plateform-ubyc.onrender.com/api/v1/user/leaderboard",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard));
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    toast.error(error.response?.data?.message || "Failed to fetch leaderboard.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export const editProfile = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.editProfileRequest());
  try {
    const response = await axios.put(
      "https://auction-plateform-ubyc.onrender.com/api/v1/user/me/update",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.editProfileSuccess(response.data.user));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.editProfileFailed());
    toast.error(error.response?.data?.message || "Failed to update profile.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchWonAuctions = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchWonAuctionsRequest());
  try {
    const response = await axios.get("https://auction-plateform-ubyc.onrender.com/api/v1/user/my-won-auctions", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchWonAuctionsSuccess(response.data.auctions));
  } catch (error) {
    dispatch(userSlice.actions.fetchWonAuctionsFailed());
    toast.error(error.response?.data?.message || "Failed to fetch won auctions.");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export default userSlice.reducer;
