import React, { useEffect } from "react";
import { Table, Avatar, ConfigProvider } from "antd";
import { IoEye } from "react-icons/io5";

import { useGetOrderQuery } from "../../../redux/apiSlices/orderSlice";

function TotalOrderList() {
  const { data: orderList, isLoading, error } = useGetOrderQuery();

  useEffect(() => {
    console.log("API Response:", orderList);
  }, [orderList]);

  // Ensure we are accessing the correct part of the API response
  const rawData = Array.isArray(orderList?.data?.orders)
    ? orderList.data.orders
    : [];

  console.log("Processed Order Data:", rawData);

  // Format data correctly for the table
  const dataSource = rawData.map((order, index) => ({
    key: order._id || index, // Ensure a unique key
    serial: order.orderNumber || `#${index + 1}`, // Use orderNumber if available
    useremail: order.email || "No Email",
    date: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : "N/A",
    amount: order.totalPrice ? `$${order.totalPrice}` : "N/A",
    paymentStatus: order.paymentStatus || "Pending",
    products: Array.isArray(order.products)
      ? order.products.map((p) => p.productName).join(", ")
      : "N/A",
  }));

  // Define table columns
  const columns = [
    {
      title: "Order #",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "User Email",
      dataIndex: "useremail",
      key: "useremail",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) =>
        status === "paid" ? (
          <span className="text-green-500">Paid</span>
        ) : (
          <span className="text-yellow-500">Pending</span>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a href="#" className="hover:text-[#a11d26]">
          <IoEye size={24} />
        </a>
      ),
    },
  ];

  // Show loading state
  if (isLoading) return <p className="text-white">Loading orders...</p>;
  if (error) return <p className="text-red-500">Error loading orders!</p>;

  return (
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key" // Ensure unique row key
      />
    </ConfigProvider>
  );
}

export default TotalOrderList;
