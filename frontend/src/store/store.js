import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import categoryReducer from "./slices/categorySlice"
import auctionReducer from "./slices/auctionSlice";
import messageReducer from "./slices/messageSlice";
import bidReducer from "./slices/messageSlice";
export const store = configureStore({
    reducer: {

      user: userReducer,
      commission: commissionReducer,
      category: categoryReducer,
      auction: auctionReducer,
      message: messageReducer,
      bid : bidReducer,
      
    },
  });