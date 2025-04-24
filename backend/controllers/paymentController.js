import crypto from "crypto";
import { razorpay } from '../server.js';
import {Auction} from "../models/auctionSchema.js";
import {User }from "../models/userSchema.js";
import {Commission} from "../models/commissionSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import axios from "axios"


// Bidder creates Razorpay order
export const initiateBidderPayment = catchAsyncErrors(async (req, res, next) => {
    const { auctionId } = req.params;
    const bidderId = req.user._id;
  
    const auction = await Auction.findById(auctionId).populate("highestBidder createdBy");
    if (!auction) return next(new ErrorHandler("Auction not found", 404));
    if (!auction.highestBidder.equals(bidderId)) {
      return next(new ErrorHandler("You are not the winning bidder.", 403));
    }
  
    const amount = auction.currentBid;
  
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `r_${auctionId.slice(0, 10)}_${bidderId.toString().slice(0, 10)}`, // fixed
      payment_capture: 1,
    });
  
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount,
      currency: "INR",
      auctionTitle: auction.title,
      auctioneerId: auction.createdBy._id,
    });
  });
  
// Bidder verifies payment after successful payment
export const verifyBidderPayment = catchAsyncErrors(async (req, res, next) => {
  const { auctionId } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrorHandler("Payment verification failed", 400));
  }

  const auction = await Auction.findById(auctionId);
  if (!auction) return next(new ErrorHandler("Auction not found", 404));

  auction.payments.bidderPaid = true;
  auction.payments.bidderReceipt = {
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    paidAt: new Date(),
  };
  await auction.save();

  const user = await User.findById(auction.highestBidder);
  user.auctionsWon += 1;
  user.moneySpent += auction.currentBid;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Payment verified and recorded.",
  });
});

// Admin sees all bidder payments (optional for your dashboard)
export const getBidderPayments = catchAsyncErrors(async (req, res, next) => {
  const paidAuctions = await Auction.find({ "payments.bidderPaid": true })
    .populate("highestBidder", "username email")
    .populate("createdBy", "username");

  res.status(200).json({
    success: true,
    payments: paidAuctions,
  });
});

// Admin sees pending payouts to auctioneers

export const getAdminPendingPayouts = catchAsyncErrors(async (req, res, next) => {
    const auctions = await Auction.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "highestBidder",
          foreignField: "_id",
          as: "highestBidderDetails",
        },
      },
      {
        $unwind: {
          path: "$createdByDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$highestBidderDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          currentBid: 1,
          image: "$image.url",
          bidderPaid: "$payments.bidderPaid",
          adminPaidAuctioneer: "$payments.adminPaidAuctioneer",
          createdBy: {
            _id: "$createdByDetails._id",
            userName: "$createdByDetails.userName",
            email: "$createdByDetails.email",
            address: "$createdByDetails.address",
          },
          highestBidder: {
            _id: "$highestBidderDetails._id",
            userName: "$highestBidderDetails.userName",
            email: "$highestBidderDetails.email",
          },
        },
      },
    ]);
  
    res.status(200).json({
      success: true,
      auctions,
    });
  });
  

      
  const razorpayAuth = {
    auth: {
      username: process.env.RAZORPAY_KEY_ID,
      password: process.env.RAZORPAY_KEY_SECRET,
    },
  };
  
  // Admin pays auctioneer (records it and updates commission)
  export const payAuctioneer = catchAsyncErrors(async (req, res, next) => {
    const { auctionId } = req.params;
  
    const auction = await Auction.findById(auctionId);
    if (!auction) return next(new ErrorHandler("Auction not found", 404));
  
    if (!auction.payments.bidderPaid) {
      return next(new ErrorHandler("Bidder has not paid yet.", 400));
    }
  
    const auctioneer = await User.findById(auction.createdBy);
    if (!auctioneer) return next(new ErrorHandler("Auctioneer not found", 404));
  
    if (auctioneer.role === 0) {
      return next(new ErrorHandler("Auctioneer is not authorized for payout", 403));
    }
  
    if (auctioneer.unpaidCommission <= 0) {
      return next(new ErrorHandler("No unpaid commission for this auctioneer", 400));
    }
  
  
    const payoutAmount = auction.currentBid - auctioneer.unpaidCommission;
    const payoutAmountInPaise = payoutAmount * 100;
  
    // Simulate payout if disabled
    if (process.env.RAZORPAY_PAYOUT_ENABLED !== "true") {
      // Simulate payout success
      await Commission.create({ amount: auctioneer.unpaidCommission, user: auctioneer._id });
      auctioneer.unpaidCommission = 0;
      await auctioneer.save();
  
      auction.payments.adminPaidAuctioneer = true;
      auction.payments.adminReceipt = {
        amountPaid: payoutAmount,
        paidAt: new Date(),
        payoutMode: "MOCK",
      };
      await auction.save();
  
      return res.status(200).json({
        success: true,
        message: "Payout simulated in dev mode",
        payout: {
          id: "mock_payout_id",
          status: "processed",
          amount: payoutAmountInPaise,
          fund_account_id: "mock_fund_account_id",
          mode: "MOCK",
          narration: `Mock payout for auction: ${auction.title}`
        }
      });
    }
  
    // 1. Create Contact
    const contactResponse = await axios.post(
      'https://api.razorpay.com/v1/contacts',
      {
        name: auctioneer.userName,
        email: auctioneer.email,
        contact: auctioneer.phone || "",
        type: "vendor",
      },
      razorpayAuth
    );
    const contactId = contactResponse.data.id;
  
    // 2. Create Fund Account
    let fundAccountId, payoutMode;
    const bank = auctioneer.paymentMethods?.bankTransfer;
    const upiId = auctioneer.paymentMethods?.upi?.upiId;
  
    if (bank?.bankAccountNumber && bank?.ifsc && bank?.accountHolderName) {
      const fundAccountRes = await axios.post(
        'https://api.razorpay.com/v1/fund_accounts',
        {
          contact_id: contactId,
          account_type: "bank_account",
          bank_account: {
            name: bank.accountHolderName,
            ifsc: bank.ifsc,
            account_number: bank.bankAccountNumber,
          },
        },
        razorpayAuth
      );
      fundAccountId = fundAccountRes.data.id;
      payoutMode = "IMPS";
    } else if (upiId) {
      const fundAccountRes = await axios.post(
        'https://api.razorpay.com/v1/fund_accounts',
        {
          contact_id: contactId,
          account_type: "vpa",
          vpa: {
            address: upiId,
          },
        },
        razorpayAuth
      );
      fundAccountId = fundAccountRes.data.id;
      payoutMode = "UPI";
    } else {
      return next(new ErrorHandler("No valid bank/UPI info provided by auctioneer", 400));
    }
  
    // 3. Create Payout
    const payoutResponse = await axios.post(
      'https://api.razorpay.com/v1/payouts',
      {
        account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
        fund_account_id: fundAccountId,
        amount: payoutAmountInPaise,
        currency: "INR",
        mode: payoutMode,
        purpose: "payout",
        queue_if_low_balance: true,
        reference_id: auctionId,
        narration: `Payout for auction: ${auction.title}`,
      },
      razorpayAuth
    );
  
    // 4. Update records
    await Commission.create({ amount: commission, user: auctioneer._id });
    auctioneer.unpaidCommission = 0;
    await auctioneer.save();
  
    auction.payments.adminPaidAuctioneer = true;
    auction.payments.adminReceipt = {
      amountPaid: payoutAmount,
      paidAt: new Date(),
      payoutMode,
    };
    await auction.save();
  
    res.status(200).json({
      success: true,
      message: "Payout sent successfully",
      payout: payoutResponse.data,
    });
  });
  


// export const payAuctioneer = catchAsyncErrors(async (req, res, next) => {
//   const { auctionId } = req.params;

//   // 1. Find the auction
//   const auction = await Auction.findById(auctionId);
//   if (!auction) return next(new ErrorHandler("Auction not found", 404));
//   if (!auction.payments.bidderPaid) {
//     return next(new ErrorHandler("Bidder has not paid yet.", 400));
//   }

//   // 2. Find the auctioneer
//   const auctioneer = await User.findById(auction.createdBy);
//   if (!auctioneer) return next(new ErrorHandler("Auctioneer not found", 404));
//   if (auctioneer.role === 0) {
//     return next(new ErrorHandler("Auctioneer is not authorized for payout", 403));
//   }
//   if (auctioneer.unpaidCommission <= 0) {
//     return next(new ErrorHandler("No unpaid commission for this auctioneer", 400));
//   }

//   // 3. Calculate commission and payout
//   const commission = Math.round(auctioneer.unpaidCommission);
//   const payoutAmount = auction.currentBid - commission;

//   const bank = auctioneer.paymentMethods?.bankTransfer;
//   const upiId = auctioneer.paymentMethods?.upi;
//   const paypal = auctioneer.paymentMethods?.paypal;
// console.log(upiId)
//   let fundAccount;
//   let payoutMode = "";
//   const payoutOptions = {
//     account_number: process.env.RAZORPAY_PRIMARY_ACCOUNT,
//     amount: payoutAmount * 100,
//     currency: "INR",
//     queue_if_low_balance: true,
//     reference_id: auctionId,
//     narration: `Auction payout for ${auction.title}`,
//   };

//   // 4. Create fund account directly (skip contact)
//   if (bank?.bankAccountNumber && bank?.bankName && (bank?.bankAccountName || "TEST0000001")) {
//     console.log("kihi", razorpay.fundAccount);
    
//     fundAccount = await razorpay.fundAccount.create({
//       account_type: "bank_account",
//       bank_account: {
//         name: bank.bankName,
//         ifsc: bank.bankAccountName || "TEST0000001",
//         account_number: bank.bankAccountNumber,
//       },
//     });
//     console.log("kihi",fundAccount);
//     payoutMode = "IMPS";
//   } else if (upiId) {
//     console.log("uoknk")
//     fundAccount = await razorpay.fundAccount.create({
//       account_type: "vpa",
//       vpa: {
//         address: upiId,
//       },
//     });
//     payoutMode = "UPI";
//   } else if (paypal) {
//     return next(new ErrorHandler("PayPal is not supported via Razorpay. Manual payout required.", 400));
//   } else {
//     return next(new ErrorHandler("No valid payment method available for payout", 400));
//   }
// console.log("funcd",fundAccount)
//   // 5. Create payout
//   const payout = await razorpay.payouts.create({
//     ...payoutOptions,
//     fund_account_id: fundAccount.id,
//     mode: payoutMode,
//   });
// console.log("pay",payout);

//   // 6. Update Commission, User, and Auction
//   await Commission.create({ amount: commission, user: auctioneer._id });
//   auctioneer.unpaidCommission = 0;
//   await auctioneer.save();

//   auction.commissionCalculated = true;
//   auction.payments.adminPaidAuctioneer = true;
//   auction.payments.adminReceipt = {
//     amountPaid: payoutAmount,
//     paidAt: new Date(),
//     payoutMode,
//   };
//   await auction.save();

//   // 7. Respond
//   res.status(200).json({
//     success: true,
//     message: "Payout sent successfully",
//     payout,
//   });
// });


// Auctioneer sees payment receipts

export const getAuctioneerReceipts = catchAsyncErrors(async (req, res, next) => {
  const auctioneerId = req.user._id;

  const auctions = await Auction.find({
    createdBy: auctioneerId,
    "payments.adminPaidAuctioneer": true,
  });

  const receipts = auctions.map(a => ({
    auctionId: a._id,
    title: a.title,
    amountPaid: a.payments.adminReceipt.amountPaid,
    paidAt: a.payments.adminReceipt.paidAt,
  }));

  res.status(200).json({ success: true, receipts });
});


