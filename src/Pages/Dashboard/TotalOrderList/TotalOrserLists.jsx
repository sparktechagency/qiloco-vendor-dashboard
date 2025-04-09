import React, { useState } from "react";
import { useGetTotalOrderListQuery } from "../../../redux/apiSlices/overViewSlice";
import { ConfigProvider, Table } from "antd";

function TotalOrserLists() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetTotalOrderListQuery();

  // Ensure data is available
  const earnings = data?.data?.earnings || [];

  // Format data for the table
  const dataSource = earnings.map((item, index) => ({
    key: item._id,
    serial: `#${index + 1}`,
    productName: item.productName || "N/A",
    email: item.email,
    createdAt: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(item.createdAt)),
    totalPrice: `$${parseFloat(item.totalPrice).toFixed(2)}`,
    deliveryStatus: item.deliveryStatus,
  }));

  const columns = [
    {
      title: "SL#",
      dataIndex: "serial",
      key: "serial",
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   render: (text) => (
    //     <div className="flex items-center gap-2">
    //       <Avatar shape="square" size="default" src={productImg} />
    //       <span>{text}</span>
    //     </div>
    //   ),
    // },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => (
    //     <a href="#" className="hover:text-[#a11d26]">
    //       <IoEye size={24} />
    //     </a>
    //   ),
    // },
  ];

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
      <p className="text-yellow-600 mb-2">Total Order List:</p>
      <div className="custom-table">
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          size="middle"
          pagination={{
            current: page,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
            pageSize: data?.data?.pagination?.limit,
            total: data?.data?.pagination?.total,
            showTotal: (total, range) => (
              <span className="text-white">{`${range[0]}-${range[1]} of ${total} items`}</span>
            ),
          }}
        />
      </div>
    </ConfigProvider>
  );
}
export default TotalOrserLists;
