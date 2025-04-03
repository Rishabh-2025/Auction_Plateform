import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCommissionProof } from "../../../store/slices/commissionSlice";

const SubmitCommission = () => {
    const [proof, setProof] = useState(null);
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const loading = false;

    const proofHandler = (e) => {
        setProof(e.target.files[0]);
    };

    const handlePaymentProof = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("proof", proof);
        formData.append("amount", amount);
        formData.append("comment", comment);
        dispatch(postCommissionProof(formData));
    };

    return (
        <div className="bg-white/50 border border-white/30 rounded-lg p-8 shadow-lg max-w-[60%] mx-auto mt-6">
            <h3 className="text-[#0099A8] text-2xl font-semibold text-center mb-6">Upload Payment Proof</h3>

            <form className="flex flex-col gap-5 w-full" onSubmit={handlePaymentProof}>
                <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-600">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none"
                        required
                    />
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-600">Payment Proof (Screenshot)</label>
                    <input
                        type="file"
                        onChange={proofHandler}
                        className="text-[16px] py-2 bg-transparent border-b-[1px] border-gray-400 focus:outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-600">Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-2 border-gray-400 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0099A8] text-white p-3 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer w-full"
                >
                    {loading ? "Uploading..." : "Upload Payment Proof"}
                </button>
            </form>
        </div>
    );
};

export default SubmitCommission;
