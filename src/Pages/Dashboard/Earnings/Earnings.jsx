import React, { useState, useEffect } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import { Table, ConfigProvider, Spin } from "antd";
import { IoEye } from "react-icons/io5";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useEarningQuery } from "../../../redux/apiSlices/earningSlice";
import moment from "moment";
import Loading from "../../../components/common/Loading";

function Earnings() {
  const [page, setPage] = useState(1);

  const {
    data: earningData,
    isError,
    isLoading,
    refetch,
  } = useEarningQuery(page);

  // Calculate total earnings
  const totalEarnings =
    earningData?.data?.earnings?.reduce((acc, item) => acc + item.earning, 0) ||
    0;

  // Refetch data when `page` changes
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-3">
      <div className="w-full h-14 flex gap-6 my-4">
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[30%] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Today's Earning
          <span>${parseFloat(totalEarnings).toFixed(2).toLocaleString()}</span>
        </div>
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[30%] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Total Earnings
          <span>${parseFloat(totalEarnings).toFixed(2).toLocaleString()}</span>
        </div>
      </div>
      <EarningsTable
        earningData={earningData}
        isLoading={isLoading}
        isError={isError}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default Earnings;

const EarningsTable = ({ earningData, isLoading, isError, page, setPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showModal = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Sl#", dataIndex: "serial", key: "serial" },
    {
      title: "Order ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => text || "N/A",
    },
    { title: "Transaction ID", dataIndex: "_id", key: "trnxid" },
    { title: "Email", dataIndex: "email", key: "email" },
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
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
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
            <Table
              columns={columns}
              dataSource={dataSource}
              size="middle"
              pagination={{
                current: page,
                onChange: (newPage) => setPage(newPage),
                showSizeChanger: false,
                pageSize: earningData?.data?.pagination?.limit || 10,
                total: earningData?.data?.pagination?.total || 0,
                showTotal: (total, range) => (
                  <span className="text-white">{`${range[0]}-${range[1]} of ${total} items`}</span>
                ),
              }}
            />
          </div>
        </ConfigProvider>
      )}
      <TransactionDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
};
