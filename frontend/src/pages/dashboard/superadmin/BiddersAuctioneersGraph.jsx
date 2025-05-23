import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { clearAllSuperAdminSliceErrors, getAllUsers } from "../../../store/slices/superAdminSlice";
import Spinner from "../../../custom-component/Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders,loading } = useSelector(
    (state) => state.superAdmin
  );
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getAllUsers());
  
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);



  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#0099A8",
        backgroundColor: "#0099A8",
        pointBackgroundColor: "#0099A8",
        pointBorderColor: "#fff",
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        // borderColor: "#E2E8F0", // slate-200
        borderColor: "red", // slate-200
        backgroundColor: "#E2E8F0",
        pointBackgroundColor: "red",
        pointBorderColor: "#E2E8F0",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#E2E8F0", // slate-200
        },
        ticks: {
          color: "#0099A8",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        grid: {
          color: "#E2E8F0",
        },
        ticks: {
          color: "#0099A8",
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders and Auctioneers Registered",
        color: "#0099A8",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      legend: {
        labels: {
          color: "#0099A8",
        },
      },
      tooltip: {
        backgroundColor: "#E5E7EB",
        titleColor: "black",
        bodyColor: "black",
      },
    },
  };

  return (<>
  
  
        <h2 className="text-3xl font-bold text-center mt-20  mb-8 text-[#0099A8]">Registered Users</h2>
    <div className="bg-white/70 rounded-xl shadow-md  p-5 h-screen ">
         {loading ? (
           <div className="flex justify-center items-center h-60">
                  <Spinner />
                </div>
              ) : (
                <Line data={data} options={options} />)}
    </div>
                </>
  );
};

export default BiddersAuctioneersGraph;
