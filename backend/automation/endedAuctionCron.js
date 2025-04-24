import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmails.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("Cron for ended auction running...");
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        console.log("hi",highestBidder);
        
        const auctioneer = await User.findById(auction.createdBy);
        console.log("auctioner",auctioneer)
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `🎉 Congratulations ${bidder.userName}! You've Won the Auction for "${auction.title}"`;

          const message = `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #0099A8;">🎉 Congratulations, ${bidder.userName}!</h2>
              <p>You've successfully won the auction for:</p>
              
              <div style="border: 1px solid #eee; padding: 15px; border-radius: 10px; background-color: #f9f9f9;">
                <img src="${auction.image}" alt="${auction.title}" style="width: 100%; max-width: 400px; border-radius: 10px;" />
                <h3 style="margin-top: 10px;">${auction.title}</h3>
                <p style="font-size: 18px; font-weight: bold;">Final Price: ₹${auction.currentBid}</p>
              </div>
          
              <p style="margin-top: 20px;">Please stay tuned for the next steps to complete your payment and receive your item.</p>
          
              <p>If you have any questions, feel free to reach out to your auctioneer at: <strong>${auctioneer.email}</strong></p>
          
              <hr style="margin: 30px 0;">
              <p style="font-size: 12px; color: #888;">This is an automated message from BidPalnce Auctions. Please do not reply directly to this email.</p>
            </div>
          `;
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
          sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};