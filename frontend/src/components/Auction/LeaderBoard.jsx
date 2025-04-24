import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../../custom-component/Spinner";
import { Avatar } from "@mui/material";
import { fetchLeaderboard } from "../../store/slices/userSlice";

const Leaderboard = () => {
  const { loading, leaderboard, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    dispatch(fetchLeaderboard());
  }, [isAuthenticated,dispatch]);

  return (
    <div className="overflow-x-auto min-h-screen    mb-2 mt-28 px-4 ">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Bidders Leaderboard</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full rounded-xl overflow-hidden">
            <thead className="bg-[#0099A8] text-white">
              <tr>
                <th className="py-3 px-4 text-center font-semibold">Rank</th>
                <th className="py-3 px-4 text-center font-semibold">Profile</th>
                <th className="py-3 px-4 text-center font-semibold">Username</th>
                <th className="py-3 px-4 text-center font-semibold">Bid Expenditure</th>
                <th className="py-3 px-4 text-center font-semibold">Auctions Won</th>
              </tr>
            </thead>
            <tbody className="text-[#0099A8] font-semibold">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No data available.
                  </td>
                </tr>
              ) : (
                leaderboard.slice(0, 100).map((element, index) => (
                  <motion.tr
                    key={element._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.02 }}
                    className="text-center border-b border-gray-300 hover:bg-slate-100"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <Avatar
                        src={element.profileImage?.url}
                        alt={element.userName}
                        className="h-12 w-12 mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4">{element.userName}</td>
                    <td className="py-3 px-4">₹ {element.moneySpent}</td>
                    <td className="py-3 px-4">{element.auctionsWon}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
