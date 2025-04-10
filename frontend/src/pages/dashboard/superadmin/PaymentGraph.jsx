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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

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
    // dispatch(getAllUsers());
    // dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);
  return (
    <div className="bg-white/70 rounded-xl shadow-md mt-20 p-5 h-screen ">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
