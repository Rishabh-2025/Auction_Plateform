import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import SignIn from "../pages/SignIn";

const AuctionCard = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleViewDetails = () => {
    if (isAuthenticated) {
      navigate(`/auction/item/${id}`);
    } else {
      setOpenSignIn(true);
    }
  };

  return (
    <Card
      sx={{
        width: isSmallScreen ? 280 : 330,
        height: isSmallScreen ? 300 : 350,
        borderRadius: 4,
        border: "2px solid #0099A8",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 150,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img src={imgSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>

      <CardContent sx={{ py: isSmallScreen ? 2 : 3 }}>
        <Typography variant="h6" fontWeight="bold" fontSize={isSmallScreen ? "18px" : "20px"} color="#0099A8" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {startingBid && (
          <Typography variant="body2" color="text.secondary" fontSize={isSmallScreen ? "16px" : "18px"}>
            Starting Bid: <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>{startingBid}</span>
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" fontSize={isSmallScreen ? "16px" : "18px"}>
          {timeLeft.type} {Object.keys(timeLeft).length > 1 ? (
            <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>{formatTimeLeft(timeLeft)}</span>
          ) : (
            <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>Time's up!</span>
          )}
        </Typography>
      </CardContent>

      <Box sx={{ mb: 2 }}>
        <Button
          onClick={handleViewDetails}
          sx={{
            color: "#E53935",
            fontWeight: "600",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          View Details &rarr;
        </Button>
      </Box>

      <SignIn open={openSignIn} handleClose={() => setOpenSignIn(false)} onSuccess={() => navigate(`/auction/item/${id}`)} />
    </Card>
  );
};

export default AuctionCard;
