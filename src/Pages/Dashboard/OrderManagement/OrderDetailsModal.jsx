import React from "react";
import { Modal, ConfigProvider, Table } from "antd";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import man from "../../../assets/quiloco/man.png";
import paycard from "../../../assets/quiloco/icons/paycard.png";

const OrderDetailsModal = ({ isModalOpen, setIsModalOpen, data, order }) => {
  // Use either data or order prop (for backward compatibility)
  const orderData = data || order;

  // Log the data to ensure it's passed correctly
  console.log("Modal data:", orderData);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#353536",
            headerBg: "#353536",
            titleColor: "#ffffff",
            titleFontSize: 24,
          },
          Table: {
            headerBg: "#353536",
            colorText: "white",
            rowHoverBg: "#4a4a4a",
          },
        },
      }}
    >
      <Modal
        title="View Details"
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <div className="flex justify-between mt-4">
          {/* Order Info */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center text-white">
              <h3>Order ID: {orderData?.orderNumber || "No Order Number"}</h3>
              <div
                className={`${
                  orderData?.deliveryStatus === "processing"
                    ? "bg-amber-400"
                    : orderData?.deliveryStatus === "pending"
                    ? "bg-red-400"
                    : orderData?.deliveryStatus === "delivered"
                    ? "bg-green-400"
                    : "bg-sky-400"
                } w-fit px-3 py-1 rounded-sm text-white`}
              >
                {orderData?.deliveryStatus
                  ? orderData.deliveryStatus.charAt(0).toUpperCase() +
                    orderData.deliveryStatus.slice(1)
                  : "No Status"}
              </div>
            </div>
            <div className="flex gap-4 items-center text-white">
              <SlCalender />
              {orderData?.createdAt
                ? `${new Date(
                    orderData.createdAt
                  ).toLocaleDateString()} - ${new Date(
                    orderData.updatedAt
                  ).toLocaleDateString()}`
                : "No date information"}
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex gap-4 items-start">
            <img
              src={man}
              alt="Customer"
              width={50}
              className="border rounded-lg"
            />
            <div>
              <h4 className="text-[20px] font-semibold text-green-400">
                Customer
              </h4>
              <p className="text-white">
                Full name: {orderData?.customerName || "N/A"}
              </p>
              <p className="text-white">Email: {orderData?.email || "N/A"}</p>
              <p className="text-white">
                Phone: {orderData?.phoneNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Info & Order Table */}
        <PaymentInfo data={orderData} />
        <OrderDetailsTable data={orderData} />
      </Modal>
    </ConfigProvider>
  );
};

export default OrderDetailsModal;

// Payment Info Component
const PaymentInfo = ({ data }) => (
  <div className="flex flex-col gap-2 my-3">
    <h5 className="text-lime-700 font-bold">Payment Info</h5>
    <div className="flex gap-3">
      <img src={paycard} alt="Card" />
      <p>
        {data?.paymentStatus === "paid"
          ? `Payment completed (${data.paymentIntentId || "No ID"})`
          : data?.paymentMethod || "Master Card **** **** 6557"}
      </p>
    </div>
  </div>
);

// Order Details Table Component
const OrderDetailsTable = ({ data }) => {
  const columns = [
    {
      title: "",
      dataIndex: "box",
      key: "box",
      render: () => <MdCheckBoxOutlineBlank size={25} />,
    },
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Serial", dataIndex: "serial", key: "serial" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  // Handle products data and ensure there's fallback
  const dataSource =
    data?.products?.map((product, index) => ({
      key: product.productId || index,
      productName: product.productName || "Unknown Product",
      serial: data?.orderNumber || "N/A",
      quantity: product.quantity || 0,
      amount: `$${product.totalPrice || 0}`,
    })) || [];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#353536",
            colorText: "white",
            rowHoverBg: "#4a4a4a",
            headerSplitColor: "none",
          },
        },
      }}
    >
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          showHeader
          // bordered
        />
        <div className="flex justify-end my-4">
          <p className="text-amber-400 mr-28">
            Total{" "}
            <span className="font-sans ml-20">${data?.totalPrice || 0}</span>
          </p>
        </div>
      </div>
    </ConfigProvider>
  );
};
