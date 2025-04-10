import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../../store/slices/userSlice";
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineHome,
    AiOutlineUpload,
} from "react-icons/ai";
import { FaMoneyCheckAlt, FaUniversity } from "react-icons/fa";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        address: "",
        profileImage: "",
        profileImagePreview: "",
        auctionsWon: 0,
        moneySpent: 0,
        unpaidCommission: 0,
        role: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankName: "",
        upiId: "",
        paypalEmail: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                profileImage: "",
                profileImagePreview: user.profileImage?.url || "",
                auctionsWon: user.auctionsWon || 0,
                moneySpent: user.moneySpent || 0,
                unpaidCommission: user.unpaidCommission || 0,
                role: user.role || "Bidder",
                bankAccountName: user.paymentMethods?.bankTransfer?.bankAccountName || "",
                bankAccountNumber: user.paymentMethods?.bankTransfer?.bankAccountNumber || "",
                bankName: user.paymentMethods?.bankTransfer?.bankName || "",
                upiId: user.paymentMethods?.upi?.upiId || "",
                paypalEmail: user.paymentMethods?.paypal?.paypalEmail || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "role") {
            if (value === "Bidder") {
                setFormData({
                    ...formData,
                    role: value,
                    bankAccountName: "",
                    bankAccountNumber: "",
                    bankName: "",
                    upiId: "",
                    paypalEmail: "",
                });
            } else {
                setFormData({
                    ...formData,
                    role: value,
                    // Keep other fields unchanged; force re-entering bank details manually
                });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                profileImage: file,
                profileImagePreview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        dispatch(editProfile(data));
    };

    return (
        <div className="max-w-5xl mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-[#0099A8] mb-6 text-center">Edit Profile</h2>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Name and Email */}
                <div className="flex flex-col sm:flex-row gap-5 text-lg">
                    <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                        <AiOutlineUser className="text-[#0099A8] text-xl mr-2" />
                        <input
                            type="text"
                            name="userName"
                            placeholder="Full Name"
                            value={formData.userName}
                            onChange={handleChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                        />
                    </div>
                    <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                        <AiOutlineMail className="text-[#0099A8] text-xl mr-2" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                        />
                    </div>
                </div>

                {/* Phone and Address */}
                <div className="flex flex-col sm:flex-row gap-5 text-lg">
                    <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                        <AiOutlinePhone className="text-[#0099A8] text-xl mr-2" />
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                        />
                    </div>
                    <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                        <AiOutlineHome className="text-[#0099A8] text-xl mr-2" />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                        />
                    </div>
                </div>

                {/* Role Select */}
                <div className="flex flex-col sm:flex-row gap-5 text-lg">
                    <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                        <AiOutlineUser className="text-[#0099A8] text-xl mr-2" />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                        >
                            <option value="Bidder">Bidder</option>
                            <option value="Auctioneer">Auctioneer</option>
                        </select>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col sm:flex-row gap-5 text-lg">
                    <div className="flex items-center gap-3 border-b border-[#0099A8] w-full">
                        <AiOutlineUpload className="text-[#0099A8] text-xl" />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="bg-transparent text-[#0099A8] w-full outline-none border-none cursor-pointer"
                        />
                    </div>
                    {formData.profileImagePreview && (
                        <img
                            src={formData.profileImagePreview}
                            alt="Preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#0099A8]"
                        />
                    )}
                </div>

                {/* Payment Methods - Auctioneer Only */}
                {formData.role === "Auctioneer" && (
                    <div className=" pt-4 mt-4">
                        <h3 className="text-2xl font-bold text-[#0099A8] mb-3">Payment Methods</h3>

                        <div className="flex flex-col sm:flex-row gap-5 text-lg">
                            <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                                <FaUniversity className="text-[#0099A8] text-xl mr-2" />
                                <input
                                    type="text"
                                    name="bankName"
                                    placeholder="Bank Name"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                />
                            </div>
                            <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                                <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                <input
                                    type="text"
                                    name="bankAccountName"
                                    placeholder="IFSC"
                                    value={formData.bankAccountName}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                />
                            </div>
                            <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                                <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                <input
                                    type="text"
                                    name="bankAccountNumber"
                                    placeholder="Bank Account Number"
                                    value={formData.bankAccountNumber}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 mt-4 text-lg">
                            <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                                <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                <input
                                    type="text"
                                    name="upiId"
                                    placeholder="UPI ID"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                />
                            </div>
                            <div className="flex items-center border-b border-[#0099A8] pb-2 w-full">
                                <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                <input
                                    type="email"
                                    name="paypalEmail"
                                    placeholder="PayPal Email"
                                    value={formData.paypalEmail}
                                    onChange={handleChange}
                                    className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-[#0099A8] text-white p-3 rounded-md hover:bg-[#095b63] transition font-bold"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
