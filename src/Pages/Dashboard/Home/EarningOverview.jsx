import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MdOutlineDateRange } from "react-icons/md";
import { ConfigProvider, DatePicker } from "antd";
import { useGetEarningDataQuery } from "../../../redux/apiSlices/overViewSlice";

export default function EarningOverview() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [isDateSelected, setIsDateSelected] = useState(false);

  const { data: productChart, isLoading } =
    useGetEarningDataQuery(selectedYear);

  // Transform API response to match the chart format
  const chartData =
    productChart?.data?.monthlyEarnings?.map((item) => ({
      name: item.month.slice(0, 3), // Convert "January" to "Jan"
      pv: item.earnings,
      amt: item.totalRevenue,
    })) || [];

  const onChange = (date, dateString) => {
    if (dateString) {
      setSelectedYear(dateString); // Update the selected year
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              hoverBorderColor: "white ",
              activeBorderColor: "white ",
            },
          },
        }}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center justify-between w-full pr-5 mb-4">
            <h2 className="text-lg font-medium text-white">Earning Overview</h2>
            <div className="flex text-white gap-5">
              <p className="font-light mt-1">Monthly growth</p>
              <span className="font-bold">
                {productChart?.data?.yearlyGrowth || "0.00"}%
              </span>
            </div>
          </div>

          <DatePicker
            onChange={onChange}
            picker="year"
            className="border border-gray-500 bg-black  text-white placeholder-white h-8 w-28 py-2 rounded-lg mb-4"
            suffixIcon={
              <div
                className="rounded-full w-6 h-6 p-1 flex items-center justify-center"
                style={{
                  backgroundColor: isDateSelected ? "#232323" : "#dddddd",
                }}
              >
                <MdOutlineDateRange
                  color={isDateSelected ? "white" : "#232323"}
                />
              </div>
            }
            style={{
              backgroundColor: "#575958 ", // Background black
              color: "white", // Input text white
            }}
          />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={isLoading ? [] : chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="100%" stopColor="#151515" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="none"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis dataKey="name" className="text-[16px]" />
            <YAxis hide={false} className="text-[16px]" />
            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Area
              type="monotone"
              dataKey="pv"
              stroke=""
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ConfigProvider>
    </>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-prince -left-1.5"></div>

        <div className="bg-white p-2 text-black rounded shadow-md">
          {payload.map((pld, index) => (
            <div key={index}>${pld.value}</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
