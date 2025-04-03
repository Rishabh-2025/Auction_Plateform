import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "700px",
    bgcolor: "#ffffff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

export default function Contactus({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [isAuthenticated, navigateTo]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={style} className="bg-[#0099A8] text-white p-5">
                    <div className="flex flex-col md:flex-row gap-5">
                        <img src="/images/signup.jpeg" alt="Sign Up" className="w-full md:w-1/3 rounded-lg" />
                        <div className="w-full">
                            <h1 className="text-center text-4xl font-bold text-[#0099A8] mb-10">Sign In</h1>
                            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSignIn}>
                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                    <AiOutlineMail className="text-[#0099A8] text-xl mr-2" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                        required
                                    />
                                </div>

                                <div className="flex items-center border-b border-[#0099A8] pb-2">
                                    <AiOutlineLock className="text-[#0099A8] text-xl mr-2" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-transparent text-[#0099A8] w-full outline-none border-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0099A8] text-white p-2 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
