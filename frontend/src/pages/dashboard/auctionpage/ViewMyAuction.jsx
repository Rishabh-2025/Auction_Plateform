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
      <div className="w-full min-h-screen px-5 pt-24 pb-10 bg-slate-200">
        <h1 className="text-2xl font-bold text-[#0099A8] mb-6">
          My Auctions
        </h1>
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
              <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl mt-5">
                You have not posted any auction.
              </h3>
            )}{" "}
            :
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMyAuctions;