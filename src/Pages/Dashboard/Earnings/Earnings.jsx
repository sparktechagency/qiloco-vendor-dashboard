import React, { useState } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import { Table, ConfigProvider, Spin } from "antd";
import { IoEye } from "react-icons/io5";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useEarningQuery } from "../../../redux/apiSlices/earningSlice";
import moment from "moment";

function Earnings() {
  const { data: earningData, isError, isLoading } = useEarningQuery();

  // Calculate total earnings
  const totalEarnings =
    earningData?.data?.earnings?.reduce((acc, item) => acc + item.earning, 0) ||
    0;

  return (
    <div className="px-3">
      <div className="w-gull h-14 flex gap-6 my-4">
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[30%] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Today's Earning
          <span>${totalEarnings.toLocaleString()}</span>
        </div>
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[30%] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Total Earnings
          <span>${totalEarnings.toLocaleString()}</span>
        </div>
      </div>
      <EarningsTable
        earningData={earningData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default Earnings;

const EarningsTable = ({ earningData, isLoading, isError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected row data

  const showModal = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => text || "N/A",
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
      key: "trnxid",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Amount",
      dataIndex: "earning",
      key: "earning",
      render: (text) => `$${text.toLocaleString()}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          href="#"
          className="hover:text-[#a11d26]"
          onClick={(e) => {
            e.preventDefault();
            showModal(record);
          }}
        >
          <IoEye size={24} />
        </a>
      ),
    },
  ];

  const dataSource =
    earningData?.data?.earnings?.map((item, index) => ({
      ...item,
      serial: index + 1,
    })) || [];

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Error loading data.</div>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#575858",
                headerSplitColor: "none",
                headerColor: "white",
                borderColor: "#A3A3A3",
                colorBgContainer: "#3a3a3a",
                rowHoverBg: "#4a4a4a",
                colorText: "white",
              },
            },
          }}
        >
          <div className="custom-table">
            <Table columns={columns} dataSource={dataSource} pagination />
          </div>
        </ConfigProvider>
      )}
      <TransactionDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={selectedTransaction} // Pass selected transaction data
      />
    </div>
  );
};
