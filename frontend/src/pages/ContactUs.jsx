import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createContact } from "../store/slices/messageSlice";

const ContactUs = () => {
    const dispatch = useDispatch();
    const loading = false;


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);
        dispatch(createContact(formData));
    };

    return (
        <div className="bg-white/50 border border-white/30 rounded-lg p-8 shadow-lg max-w-[60%] mx-auto mt-28 mb-10">
            <h3 className="text-[#0099A8] text-4xl font-bold text-center mb-6">Contact Us</h3>
            <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-2">
                    <AiOutlineUser className="text-[#0099A8] text-xl" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="text-[16px] py-2 bg-transparent w-full outline-none border-none"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 border-b border-gray-400 pb-2">
                    <AiOutlineMail className="text-[#0099A8] text-xl" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        className="text-[16px] py-2 bg-transparent w-full outline-none border-none"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 border-b border-gray-400 pb-2">
                    <BiMessageSquareDetail className="text-[#0099A8] text-xl" />
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        className="text-[16px] py-2 bg-transparent w-full outline-none border-none"
                        required
                    />
                </div>

                <div className="flex items-start gap-2 border border-gray-400 p-2 rounded-md">
                    <FaRegCommentDots className="text-[#0099A8] text-xl mt-1" />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Your Message"
                        className="text-[16px] py-2 bg-transparent w-full outline-none border-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0099A8] text-white p-3 rounded-md hover:bg-[#095b63] transition font-bold cursor-pointer w-full"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>

            {/* Google Map */}
            <div className="mt-8">
                <iframe
                    title="Google Map"
                    className="w-full h-80 rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509368!2d144.95592831531686!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c36dd12f220!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1613983635053!5m2!1sen!2sau"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
