import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);



  return (
    <section className="w-full h-fit px-5 py-36 text-center justify-center container flex flex-col items-center">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#0099A8] text-2xl font-bold mb-5 min-[480px]:text-4xl md:text-6xl text-center"
          >
            Bidders Leaderboard
          </motion.div>

          <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
            <Table>
              <TableHead className="bg-[#0099A8]">
                <TableRow>
                  <TableCell className="text-white text-lg font-semibold text-center">Rank</TableCell>
                  <TableCell className="text-white text-lg font-semibold text-center">Profile</TableCell>
                  <TableCell className="text-white text-lg font-semibold text-center">Username</TableCell>
                  <TableCell className="text-white text-lg font-semibold text-center">Bid Expenditure</TableCell>
                  <TableCell className="text-white text-lg font-semibold text-center">Auctions Won</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.slice(0, 100).map((element, index) => (
                  <motion.tr
                    key={element._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-gray-300 hover:bg-gray-100 transition"
                  >
                    <TableCell className="text-gray-700 font-semibold text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      <Avatar src={element.profileImage?.url} alt={element.userName} className="h-12 w-12 mx-auto" />
                    </TableCell>
                    <TableCell className="text-gray-700 text-center">{element.userName}</TableCell>
                    <TableCell className="text-gray-700 text-center">${element.moneySpent}</TableCell>
                    <TableCell className="text-gray-700 text-center">{element.auctionsWon}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
