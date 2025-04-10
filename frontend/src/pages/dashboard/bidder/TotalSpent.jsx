import React from "react";
import { FaWallet, FaTrophy, FaMoneyBillWave } from "react-icons/fa";
import { useSelector } from "react-redux";

const TotalSpent = () => {
    const { user } = useSelector((state) => state.user);
    const { moneySpent = 0, auctionsWon = 0, unpaidCommission = 0 } = user || {};

    return (
        <div className="bg-white shadow-md p-6 rounded-xl w-full sm:max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {/* Total Spent */}
            <div className="flex flex-col items-center space-y-2">
                <div className="bg-[#0099A8]/10 p-4 rounded-full">
                    <FaWallet className="text-[#0099A8] text-3xl" />
                </div>
                <h4 className="text-gray-600 text-sm font-semibold">Total Spent</h4>
                <p className="text-2xl font-bold text-[#0099A8]">₹ {moneySpent}</p>
            </div>

            {/* Auctions Won */}
            <div className="flex flex-col items-center space-y-2">
                <div className="bg-[#0099A8]/10 p-4 rounded-full">
                    <FaTrophy className="text-[#0099A8] text-3xl" />
                </div>
                <h4 className="text-gray-600 text-sm font-semibold">Auctions Won</h4>
                <p className="text-2xl font-bold text-[#0099A8]">{auctionsWon}</p>
            </div>

            {/* Unpaid Commission */}
            <div className="flex flex-col items-center space-y-2">
                <div className="bg-[#0099A8]/10 p-4 rounded-full">
                    <FaMoneyBillWave className="text-[#E53935] text-3xl" />
                </div>
                <h4 className="text-gray-600 text-sm font-semibold">Unpaid Commission</h4>
                <p className="text-2xl font-bold text-[#E53935]">₹ {unpaidCommission}</p>
            </div>
        </div>
    );
};

export default TotalSpent;
