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
import { DatePicker } from "antd";

function generateRandomData() {
  return [
    { name: "Jan", pv: getRandomPv(), amt: 2400 },
    { name: "Feb", pv: getRandomPv(), amt: 2210 },
    { name: "Mar", pv: getRandomPv(), amt: 2290 },
    { name: "Apr", pv: getRandomPv(), amt: 2000 },
    { name: "May", pv: getRandomPv(), amt: 2181 },
    { name: "Jun", pv: getRandomPv(), amt: 2500 },
    { name: "Jul", pv: getRandomPv(), amt: 2100 },
    { name: "Aug", pv: getRandomPv(), amt: 2600 },
    { name: "Sep", pv: getRandomPv(), amt: 2700 },
    { name: "Oct", pv: getRandomPv(), amt: 2800 },
    { name: "Nov", pv: getRandomPv(), amt: 3000 },
    { name: "Dec", pv: getRandomPv(), amt: 3200 },
  ];
}

function getRandomPv() {
  return Math.floor(Math.random() * (10000 - 2000) + 2000);
}

const data = generateRandomData();

export default function EarningOverview() {
  const [isDateSelected, setIsDateSelected] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setIsDateSelected(!!date); // Update state based on date selection
  };

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center justify-between w-full pr-5 mb-4">
          <h2 className="text-lg font-medium text-white">Earning Overview</h2>
          <div className="flex  text-white gap-5">
            <p className="font-light text-white">Monthly growth</p>
            <span className="font-bold">35.80%</span>
          </div>
        </div>

        <DatePicker
          onChange={onChange}
          picker="year"
          className="border-1 h-8 w-28 py-2 rounded-lg mb-4"
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
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
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
          {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
          <Tooltip
            content={<CustomTooltip />}
            // cursor={{ fill: "transparent" }}
            isAnimationActive={true}
            cursor={false}
          />

          <Area
            type="monotone"
            dataKey="pv"
            stroke=""
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        {/* Arrow (pointing left) */}
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-prince -left-2"></div>

        {/* Tooltip Content */}
        <div className="bg-white p-2 text-black rounded shadow-md ">
          {payload.map((pld, index) => (
            <div key={index}>{pld.value}K</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
