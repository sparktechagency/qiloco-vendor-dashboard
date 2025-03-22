import React from "react";
import { Table, Avatar, ConfigProvider } from "antd";
import { IoEye } from "react-icons/io5";
import productImg from "../../../assets/quiloco/productImg.png";

const rawData = [
  {
    key: "1",
    serial: "001",
    productname: "Wireless Mouse",
    useremail: "mike@example.com",
    date: "2025-02-24",
    amount: "$25.99",
    payment: "paid",
    pic: productImg, // Example image for all
  },
  {
    key: "2",
    serial: "002",
    productname: "Mechanical Keyboard",
    useremail: "john@example.com",
    date: "2025-02-23",
    amount: "$79.99",
    payment: "pending",
    pic: productImg,
  },
  {
    key: "3",
    serial: "003",
    productname: "Gaming Headset",
    useremail: "sara@example.com",
    date: "2025-02-22",
    amount: "$59.99",
    payment: "pending",
    pic: productImg,
  },
  {
    key: "4",
    serial: "004",
    productname: "USB-C Hub",
    useremail: "dave@example.com",
    date: "2025-02-21",
    amount: "$39.99",
    payment: "paid",
    pic: productImg,
  },
  {
    key: "5",
    serial: "005",
    productname: "Webcam 1080p",
    useremail: "emma@example.com",
    date: "2025-02-20",
    amount: "$49.99",
    payment: "pending",
    pic: productImg,
  },
];

// Add "#" to serial numbers using map
const dataSource = rawData.map((item) => ({
  ...item,
  serial: `#${item.serial}`,
}));

const columns = [
  {
    title: "Serial",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "Product Name",
    dataIndex: "productname",
    key: "productname",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <Avatar shape="square" size="default" src={record.pic} />
        <span>{record.productname}</span>
      </div>
    ),
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
    dataIndex: "payment",
    key: "payment",
    render: (_, record) =>
      record.payment === "paid" ? (
        <span className="text-green-500">Paid</span>
      ) : (
        <span className="text-yellow-500">Pending</span>
      ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <a href="#" className="hover:text-[#a11d26]">
        <IoEye size={24} />
      </a>
    ),
  },
];

function TotalOrderList() {
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
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </ConfigProvider>
  );
}

export default TotalOrderList;
