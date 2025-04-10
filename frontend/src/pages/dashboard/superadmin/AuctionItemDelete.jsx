import { Avatar } from "@mui/material";
import { deleteAuctionItem } from "../../../store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../custom-component/Spinner";

const AuctionItemDelete = () => {
    const { allAuctions,loading } = useSelector((state) => state.auction);
    const dispatch = useDispatch();

    const handleAuctionDelete = (id) => {
        dispatch(deleteAuctionItem(id));
    };

    return (
        <>
            <div className="overflow-x-auto mb-10 mt-20 ">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">Manage Your Auctions</h2>
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
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#0099A8] font-semibold ">
                        {allAuctions.length > 0 ? (
                            allAuctions.map((element) => {
                                return (
                                    <tr key={element._id} className="border-b-1 border-[#0099A8] text-center">
                                        <td className="py-2 px-4 flex justify-center">
                                            <Avatar src={element.image?.url}
                                                alt={element.title} />
                                        </td>
                                        <td className="py-2 px-4">{element.title}</td>
                                        <td className="py-2 px-4 flex space-x-2 justify-center">
                                            <Link
                                                to={`/auction/details/${element._id}`}
                                                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-all duration-300"
                                            >
                                                View
                                            </Link>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-300"
                                                onClick={() => handleAuctionDelete(element._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-left text-xl text-sky-600 py-3">
                                <td>No Auctions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>)}
            </div>
        </>
    );
};

export default AuctionItemDelete;