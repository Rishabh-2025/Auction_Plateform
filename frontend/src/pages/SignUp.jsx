
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlineLock,
    AiOutlinePhone,
    AiOutlineHome,
    AiOutlineUpload,
} from "react-icons/ai";
import { FaMoneyCheckAlt, FaUniversity } from "react-icons/fa";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1100px",
    bgcolor: "#ffffff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

export default function SignUp({ open, handleClose }) {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankName: "",
        upiId: "",
        paypalEmail: "",
        profileImage: "",
        profileImagePreview: "",
    });

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) navigateTo("/");
    }, [isAuthenticated, navigateTo]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const handleRegister = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        
        dispatch(register(data));
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={open}>
                <Box sx={style} className="bg-[#0099A8] text-white p-5">

                    <div className="flex flex-col md:flex-row gap-5">

                        <img src="/images/signup.jpeg" alt="Sign Up" className="w-full md:w-1/3 rounded-lg" />
                        <div className="w-full">

                            <h1 className="text-center text-4xl font-bold text-[#0099A8] mb-10">Sign UP</h1>
                            <form className="flex flex-col gap-4 mt-4" onSubmit={handleRegister}>

                                <div className="flex flex-col sm:flex-row gap-5 mb-5 text-lg">
                                    <div className="flex items-center border-b border-[#0099A8] pb-2">
                                        <AiOutlineUser className="text-[#0099A8] text-xl mr-2" />
                                        <input type="text" name="userName" placeholder="Full Name" value={formData.userName} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                    </div>
                                    <div className="flex items-center border-b border-[#0099A8] pb-2">
                                        <AiOutlineMail className="text-[#0099A8] text-xl mr-2" />
                                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                    </div>
                                </div>

                                {/* Password, Phone, Role */}
                                <div className="flex flex-col sm:flex-row gap-5 mb-5 text-lg">
                                    <div className="flex items-center border-b border-[#0099A8] pb-2">
                                        <AiOutlineLock className="text-[#0099A8] text-xl mr-2" />
                                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                    </div>
                                    <div className="flex items-center border-b border-[#0099A8] pb-2">
                                        <AiOutlinePhone className="text-[#0099A8] text-xl mr-2" />
                                        <input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                    </div>

                                    {/* Role Selection */}
                                    <FormControl fullWidth variant="standard" sx={{ borderBottom: "0.5px solid #0099A8", width:"150px" }}>
                                        <InputLabel sx={{ color: "#0099A8" }}>Select Role</InputLabel>
                                        <Select name="role" value={formData.role} onChange={handleChange} sx={{ color: "#0099A8" }}>
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Auctioneer">Auctioneer</MenuItem>
                                            <MenuItem value="Bidder">Bidder</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* Address & Profile Image */}
                                <div className="flex flex-col sm:flex-row gap-5 mb-5 text-lg">
                                    <div className="flex items-center border-b border-[#0099A8] pb-2">
                                        <AiOutlineHome className="text-[#0099A8] text-xl mr-2" />
                                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                    </div>
                                    <div className="flex items-center gap-3 border-b border-[#0099A8]">
                                        <AiOutlineUpload className="text-[#0099A8] text-xl" />
                                        <input type="file" onChange={handleImageChange} placeholder="Add Profile Image" className="bg-transparent text-[#0099A8] w-full outline-none border-none cursor-pointer" />
                                    </div>
                                </div>




                                {/* Auctioneer Fields */}
                                {formData.role === "Auctioneer" && (
                                    <>
                                        <div className="flex flex-col gap-4">

                                            <div className="flex flex-col sm:flex-row gap-5 mb-5 text-lg">
                                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                                    <FaUniversity className="text-[#0099A8] text-xl mr-2" />
                                                    <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                                </div>

                                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                                    <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                                    <input type="text" name="bankAccountName" placeholder="Bank Account Name" value={formData.bankAccountName} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                                </div>
                                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                                    <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                                    <input type="text" name="bankAccountNumber" placeholder="Bank Account Number" value={formData.bankAccountNumber} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-5 mb-5 text-lg">
                                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                                    <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                                    <input type="text" name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                                </div>

                                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                                    <FaMoneyCheckAlt className="text-[#0099A8] text-xl mr-2" />
                                                    <input type="text" name="paypalEmail" placeholder="PayPal Email" value={formData.paypalEmail} onChange={handleChange} className="bg-transparent text-[#0099A8] w-full outline-none border-none" />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}

                                <button type="submit" disabled={loading} className="bg-[#0099A8] text-whit p-2 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer">
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}