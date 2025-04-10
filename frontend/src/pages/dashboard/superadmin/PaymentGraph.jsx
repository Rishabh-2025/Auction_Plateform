import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { clearAllSuperAdminSliceErrors, getMonthlyRevenue } from "../../../store/slices/superAdminSlice";
import Spinner from "../../../custom-component/Spinner";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const { monthlyRevenue,loading } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#0099A8",
        borderRadius: 6,
        barThickness: 30,
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
        max: 5000,
        grid: {
          color: "#E2E8F0", // slate-200
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
        text: "Monthly Total Payments Received",
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
        backgroundColor: "#0099A8",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);
  return (
    <>
    
        <h2 className="text-3xl font-bold text-center mt-20 mb-8 text-[#0099A8]">Monthly Revenue</h2>
    <div className="bg-white/70 rounded-xl shadow-md  p-5 h-screen ">
        {loading ? (
          <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : (
        <Bar data={data} options={options} />)}
    </div>
        </>
  );
};

export default PaymentGraph;
