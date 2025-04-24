// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { fetchWonAuctions } from "../../../store/slices/userSlice";
// import Spinner from "../../../custom-component/Spinner";

// const AuctionWon = () => {
//   const dispatch = useDispatch();
//   const { wonAuctions,loading } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchWonAuctions());
//   }, [dispatch]);

//   return (
//     <div className=" mb-10 mt-20 px-4">
//       <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Auctions You've Won</h2>
//        {loading ? (
//               <div className="flex justify-center items-center h-60">
//                 <Spinner />
//               </div>
//             ) : (
//       <table className="min-w-full bg-white border-gray-300 rounded-xl shadow-md">
//         <thead className="bg-[#0099A8] text-white">
//           <tr>
//             <th className="py-2 px-4 text-center">Image</th>
//             <th className="py-2 px-4 text-center">Title</th>
//             <th className="py-2 px-4 text-center">Current Bid</th>
//             <th className="py-2 px-4 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody className="text-[#0099A8] font-semibold">
//           {wonAuctions.length > 0 ? (
//             wonAuctions.map((auction) => (
//               <tr key={auction._id} className="border-b-1 border-[#0099A8] text-center">
//                 <td className="py-2 px-4 flex justify-center">
//                   <Avatar src={auction.image?.url} alt={auction.title} />
//                 </td>
//                 <td className="py-2 px-4">{auction.title}</td>
//                 <td className="py-2 px-4">${auction.currentBid}</td>
//                 <td className="py-2 px-4">
//                   <Link
//                     to={`/auction/details/${auction._id}`}
//                     className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-all duration-300"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//             <td colSpan="3" className="text-center py-4 text-gray-500">No won auctions found.</td>
//           </tr>
//           )}
//         </tbody>
//       </table>)}
//     </div>
//   );
// };

// export default AuctionWon;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchWonAuctions } from "../../../store/slices/userSlice";
import { initiateBidderPayment, verifyBidderPayment } from "../../../store/slices/paymentSlice";
import Spinner from "../../../custom-component/Spinner";
import { toast } from "react-toastify";

const AuctionWon = () => {
  const dispatch = useDispatch();
  const { wonAuctions, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchWonAuctions());
  }, [dispatch]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    const handlePayment = async (auctionId, auctionTitle) => {
      const resScript = await loadRazorpayScript();
      if (!resScript) return toast.error("Failed to load Razorpay SDK.");
    
      try {
        const data = await dispatch(initiateBidderPayment(auctionId));
  
    
        if (!data || !data.success) return toast.error("Payment initialization failed");
    
        const options = {
          key: "rzp_test_Y1iNwbepwntao5",
          amount: data.amount * 100,
          currency: data.currency,
          name: "Auction Payment",
          description: `Payment for ${auctionTitle}`,
          order_id: data.orderId,
          handler: async (response) => {
            dispatch(
              verifyBidderPayment(auctionId, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).then(() => {
              toast.success("Payment verified successfully");
              dispatch(fetchWonAuctions());
            });
          },
          prefill: {
            name: "BidPalace",
            email: "bidpalace@gmail.com",
          },
          theme: {
            color: "#0099A8",
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("Something went wrong during payment.");
      }
    };
    

  return (
    <div className="mb-10 mt-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">
        Auctions You've Won
      </h2>
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
              <th className="py-2 px-4 text-center">Current Bid</th>
              <th className="py-2 px-4 text-center">Action</th>
              <th className="py-2 px-4 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="text-[#0099A8] font-semibold">
            {wonAuctions.length > 0 ? (
              wonAuctions.map((auction) => (
                <tr key={auction._id} className="border-b-1 border-[#0099A8] text-center">
                  <td className="py-2 px-4 flex justify-center">
                    <Avatar src={auction.image?.url} alt={auction.title} />
                  </td>
                  <td className="py-2 px-4">{auction.title}</td>
                  <td className="py-2 px-4">${auction.currentBid}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/auction/details/${auction._id}`}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-all duration-300"
                    >
                      View
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handlePayment(auction._id, auction.title)}
                      disabled={auction.payments?.bidderPaid}
                      className={`${
                        auction.payments?.bidderPaid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-700"
                      } text-white py-1 px-3 rounded-md transition-all duration-300`}
                    >
                      {auction.payments?.bidderPaid ? "Paid" : "Pay Now"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No won auctions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuctionWon;
