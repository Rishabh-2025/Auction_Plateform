import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Modal,
  TextField,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "../store/slices/auctionSlice";
import { motion } from "framer-motion";
import { FaTrash, FaRedoAlt, FaEye } from "react-icons/fa";

const AuctionCard2 = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

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

  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  return (
    <>
      <Card
        sx={{
          width: isSmallScreen ? 280 : 330,
          borderRadius: 4,
          border: "2px solid #0099A8",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          // backgroundColor: "slategray",
          boxShadow: 3,
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: "#E2E8F0", // slate-200
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={imgSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>

        <CardContent sx={{ py: isSmallScreen ? 2 : 3 }}>
          <Typography variant="h6" fontWeight="bold" color="#0099A8" fontSize={isSmallScreen ? "18px" : "20px"} sx={{ mb: 1 }}>
            {title}
          </Typography>

          {startingBid && (
            <Typography variant="body2" fontWeight={"bold"} fontSize={isSmallScreen ? "16px" : "18px"}>
              Starting Bid:
              <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>{startingBid}</span>
            </Typography>
          )}

          <Typography variant="body2" color="white" fontSize={isSmallScreen ? "16px" : "18px"}>
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>{formatTimeLeft(timeLeft)}</span>
            ) : (
              <span style={{ color: "#0099A8", fontWeight: "bold", marginLeft: 4 }}>Time's up!</span>
            )}
          </Typography>
        </CardContent>

        <Box sx={{ px: 2, pb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            component={Link}
            to={`/auction/details/${id}`}
            startIcon={<FaEye />}
            sx={{
              backgroundColor: "#0099A8",
              color: "#ffffffb3", // white/70
              fontWeight: "600",
              "&:hover": { backgroundColor: "#00788b" },
            }}
          >
            View Auction
          </Button>
          <Button
            onClick={handleDeleteAuction}
            startIcon={<FaTrash />}
            sx={{
              backgroundColor: "#E53935",
              color: "#ffffffb3",
              fontWeight: "600",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Delete Auction
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            startIcon={<FaRedoAlt />}
            disabled={new Date(endTime) > Date.now()}
            sx={{
              backgroundColor: "#FFA000",
              color: "#ffffffb3",
              fontWeight: "600",
              "&:hover": { backgroundColor: "#FF8F00" },
            }}
          >
            Republish Auction
          </Button>
        </Box>
      </Card>

      <RepublishModal open={openModal} setOpen={setOpenModal} id={id} />
    </>
  );
};

export default AuctionCard2;

const RepublishModal = ({ open, setOpen, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleRepublish = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          maxWidth: 500,
          backgroundColor: "white",
          borderRadius: 12,
          padding: "24px",
          outline: "none",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h6" align="center" className="text-2xl" sx={{ fontWeight: "bold", color: "#0099A8", mb: 2 }}>
          Republish Auction
        </Typography>
        <Typography variant="body2" sx={{ color: "#334155", mb: 3 }}>
          Let's republish the auction with the same details but a new starting and ending time.
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#0099A8", mb: 1 }}>
              New Start Time
            </Typography>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<TextField fullWidth variant="standard" />}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "#0099A8", mb: 1 }}>
              New End Time
            </Typography>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<TextField fullWidth variant="standard" />}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            onClick={handleRepublish}
            disabled={loading}
            sx={{
              backgroundColor: "#0099A8",
              color: "#ffffffb3",
              fontWeight: "600",
              "&:hover": { backgroundColor: "#00788b" },
            }}
          >
            {loading ? "Republishing..." : "Republish"}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#FFA000",
              color: "#ffffffb3",
              fontWeight: "600",
              "&:hover": { backgroundColor: "#FF8F00" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </motion.div>
    </Modal>
  );
};
