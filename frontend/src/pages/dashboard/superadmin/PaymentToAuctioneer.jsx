import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPaymentStatuses, payAuctioneer } from "../../../store/slices/paymentSlice";
import Spinner from "../../../custom-component/Spinner";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";

const PaymentToAuctioneer = () => {
  const dispatch = useDispatch();
  const { allPayments, loading } = useSelector((state) => state.payment); // <-- Add default value for allPayments

  useEffect(() => {
    dispatch(fetchAllPaymentStatuses());
  }, [dispatch]);
  
  console.log(allPayments);

  const handlePay = async (auctionId) => {
    const res = await dispatch(payAuctioneer(auctionId));
    console.log("res", res);

    if (res?.payload?.success) {
      toast.success("Payout successful");
      dispatch(fetchAllPaymentStatuses()); // Refresh data
    } else {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="mb-10 mt-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Admin Payouts to Auctioneers</h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
        <table className="min-w-full bg-white border-gray-300 rounded-xl shadow-md">
          <thead className="bg-[#0099A8] text-white">
            <tr>
              <th className="py-2 px-4 text-center">Image</th>
              <th className="py-2 px-4 text-center">Title</th>
              <th className="py-2 px-4 text-center">Price</th>
              <th className="py-2 px-4 text-center">Auctioneer</th>
              <th className="py-2 px-4 text-center">Bidder</th>
              <th className="py-2 px-4 text-center">Bidder Paid</th>
              <th className="py-2 px-4 text-center">Admin Paid</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#0099A8] font-semibold">
            {allPayments.length > 0 ? (
              allPayments.map((auction) => (
                <tr key={auction._id} className="border-b-1 border-[#0099A8] text-center">
                  <td className="py-2 px-4 flex justify-center">
                    <Avatar src={auction.image} alt={auction.title} />
                  </td>
                  <td className="py-2 px-4">{auction.title}</td>
                  <td className="py-2 px-4">₹{auction.currentBid}</td>
                  <td className="py-2 px-4">
                    {auction.createdBy?.userName || "Unknown"}
                  </td>
                  <td className="py-2 px-4">
                    {auction.highestBidder?.userName || "Not Bidded"}
                  </td>
                  <td className="py-2 px-4">
                    {auction.bidderPaid ? "✅" : "❌"}
                  </td>
                  <td className="py-2 px-4">
                    {auction.adminPaidAuctioneer ? "✅" : "❌"}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handlePay(auction._id)}
                      disabled={!auction.bidderPaid || auction.adminPaidAuctioneer}
                      className={`${
                        auction.adminPaidAuctioneer
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#0099A8] cursor-pointer hover:bg-[#0099C2]"
                      } text-white py-1 px-1 rounded-md transition-all duration-300`}
                    >
                      {auction.adminPaidAuctioneer ? "Paid" : "Pay Auctioneer"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No auction payouts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentToAuctioneer;
