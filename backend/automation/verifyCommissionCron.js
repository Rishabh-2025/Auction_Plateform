import cron from "node-cron";
import { User } from "../models/userSchema.js";
import { Commission } from "../models/commissionSchema.js";
import { Auction } from "../models/auctionSchema.js";
import { sendEmail } from "../utils/sendEmails.js";

/**
 * CRON JOB: Runs every 1 minute to:
 * 1. Settle unpaid commissions after admin pays auctioneer.
 * 2. Notify winning bidder once their payment is processed.
 */
export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Commission & Bidder Notification Cron...");

    try {
      // Get all completed auctions with both payments done
      const auctionsToProcess = await Auction.find({
        "payments.bidderPaid": true,
        "payments.adminPaidAuctioneer": true,
        "notificationsSent": { $ne: true }, // Ensure one-time notification
      });

      for (const auction of auctionsToProcess) {
        // --- Notify Auctioneer & Settle Commission ---
        const auctioneer = await User.findById(auction.createdBy);
        if (auctioneer && auctioneer.unpaidCommission > 0) {
          const commissionAmount = auctioneer.unpaidCommission;

          await Commission.create({
            amount: commissionAmount,
            user: auctioneer._id,
          });

          auctioneer.unpaidCommission = 0;
          await auctioneer.save();

          const auctioneerEmailMsg = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0099A8;">Commission Settlement Confirmation</h2>
    <p>Dear <strong>${auctioneer.userName}</strong>,</p>
    <p>We are pleased to inform you that your commission of <strong>₹${commissionAmount}</strong> 
    for the auction titled "<strong>${auction.title}</strong>" has been successfully settled.</p>
    <p>Thank you for being a valued auctioneer on <strong>BidPalace</strong>.</p>
    <br />
    <p>Best regards,</p>
    <p><strong>BidPalace Auctions Team</strong></p>
  </div>
`;

          await sendEmail({
            email: auctioneer.email,
            subject: "Your Commission Has Been Settled",
            message: auctioneerEmailMsg,
          });

          console.log(`Commission settled for auctioneer ${auctioneer._id}`);
        }

        // --- Notify Winning Bidder ---
        const winningBidder = await User.findById(auction.winningBidder);
        if (winningBidder) {
          const bidderEmailMsg = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #0099A8;">Payment Confirmation</h2>
            <p>Dear <strong>${winningBidder.userName}</strong>,</p>
            <p>We have successfully received and verified your payment of 
            <strong>₹${auction.soldFor}</strong> for the auction titled "<strong>${auction.title}</strong>".</p>
            <p>Thank you for your participation and congratulations on your win!</p>
            <br />
            <p>Best regards,</p>
            <p><strong>BidPalace Auctions Team</strong></p>
          </div>
        `;
        

          await sendEmail({
            email: winningBidder.email,
            subject: "Payment Confirmation for Auction Win",
            message: bidderEmailMsg,
          });

          console.log(`Bidder ${winningBidder._id} notified for payment success.`);
        }

        // --- Mark auction as notifications sent ---
        auction.notificationsSent = true;
        await auction.save();
      }
    } catch (error) {
      console.error("Error in Commission/Bidder Notification Cron:", error.message);
    }
  });
};
