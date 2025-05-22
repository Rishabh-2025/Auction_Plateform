import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./router/userRoutes.js"
import auctionItemRouter from "./router/auctionItemRoutes.js"
import bidRoute from "./router/bidRoutes.js";
import commissionRoute from "./router/commissionRouter.js";
import categoryRoute from "./router/categoryRoutes.js";
import messageRoute from "./router/messageRoutes.js";
import superAdminRoute from "./router/superAdminRoutes.js";
import paymentRoute from "./router/paymentRoutes.js";
import { catchAsyncErrors } from "./middlewares/catchAsyncErrors.js";

import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";


const app = express();

config({
    path:"./config/config.env"
})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}))
app.set('trust proxy', 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp",
}));


import session from "express-session";
import MongoStore from "connect-mongo";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use('/api/v1/user',userRoute)
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use('/api/v1/bid',bidRoute)
app.use('/api/v1/commission',commissionRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/contact-us',messageRoute)
app.use('/api/v1/superadmin',superAdminRoute)
app.use('/api/v1/payment',paymentRoute)
endedAuctionCron();
verifyCommissionCron();
connection();

app.use(errorMiddleware);
app.use(catchAsyncErrors);
export default app;
