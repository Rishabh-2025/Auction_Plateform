import AuctionCard2 from "../../../custom-component/AuctionCard2";
import Spinner from "../../../custom-component/Spinner";
import { getMyAuctionItems } from "../../../store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !(user.role === "Auctioneer" || user.role === "Super Admin")) {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <div className="w-full min-h-screen px-5  pb-10 bg-slate-200 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0099A8]">My Auctions</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div
            className={`${myAuctions.length > 2 && "flex-grow"
              } flex flex-wrap gap-6`}
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => {
                return (
                  <AuctionCard2
                    title={element.title}
                    startingBid={element.startingBid}
                    endTime={element.endTime}
                    startTime={element.startTime}
                    imgSrc={element.image?.url}
                    id={element._id}
                    key={element._id}
                  />
                );
              })
            ) : (
              <div className="text-center  w-full">
              <p className="text-center text-xl py-4 text-gray-500"> You have not posted any auction.</p>
            </div>
             
            )}{" "}
            :
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMyAuctions;