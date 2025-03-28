import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  ConfigProvider,
  Button,
  Dropdown,
  Menu,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/apiSlices/orderSlice";

import OrderDetailsModal from "./OrderDetailsModal";
import Spinner from "../../../components/common/Spinner";
import Loading from "../../../components/common/Loading";

function OrderManagement() {
  const [selected, setSelected] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch the orders and the mutation hook
  const { data: orderList, isLoading } = useGetOrderQuery(page);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (orderList?.data?.orders) {
      const formattedData = orderList.data.orders.map((order, index) => ({
        key: order._id,
        serial: `#${index + 1}`,
        productname: order.products?.[0]?.productName || "N/A",
        customerName: order.customerName || "Unknown",
        date: new Date(order.createdAt).toLocaleString(),
        amount: `$${order.totalPrice.toFixed(2)}`,
        status:
          order.deliveryStatus.charAt(0).toUpperCase() +
          order.deliveryStatus.slice(1), // Capitalize first letter
        fullData: order, // Store the original order data
      }));
      setData(formattedData);
    }
  }, [orderList]);

  const showModal = (order) => {
    // Send the original order data to the modal
    setSelectedOrder(order.fullData);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (key, newStatus) => {
    const selectedOrder = data.find((item) => item.key === key);

    if (!selectedOrder) return message.error("Order not found!");

    try {
      const response = await updateOrderStatus({
        status: newStatus,
        id: selectedOrder.key,
      }).unwrap();

      if (response.success) {
        message.success(
          response.message || "Order status updated successfully"
        );

        // Update UI
        setData((prevData) =>
          prevData.map((item) =>
            item.key === key
              ? {
                  ...item,
                  status:
                    newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
                }
              : item
          )
        );
      } else {
        message.error(response.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Order update failed:", error);
      message.error(
        error?.data?.message || "An error occurred while updating order status"
      );
    }
  };

  const filteredData = data.filter(
    (item) => selected === "All" || item.status === selected
  );

  const columns = [
    {
      title: "Sl#",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {/* <Avatar
            shape="square"
            size="default"
            src="https://via.placeholder.com/50"
          /> */}
          <span>{record.productname}</span>
        </div>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
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
      render: (amount) => {
        // Convert to number and ensure 2 decimal places
        const numericAmount = parseFloat(amount.replace("$", "")); // Remove $ if present
        return <p>{isNaN(numericAmount) ? "N/A" : numericAmount.toFixed(2)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          Pending: "text-yellow-400 border border-yellow-400 bg-yellow-950",
          Processing: "text-red-400 border border-red-400 bg-red-950",
          Shipped: "text-sky-400 border border-sky-400 bg-sky-950",
          Delivered: "text-teal-400 border border-teal-400 bg-teal-950",
        };

        return (
          <span
            className={`${
              statusColors[status] || "text-white"
            } font-semibold rounded-lg px-3 py-1`}
          >
            {isLoading ? <Spinner /> : status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.key, key)}>
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="processing">Processing</Menu.Item>
            {/* <Menu.Item key="canceled">Canceled</Menu.Item> */}
            <Menu.Item key="delivered">Delivered</Menu.Item>
          </Menu>
        );

        return (
          <div className="flex items-center gap-2">
            <Button
              className="bg-transparent text-white rounded-lg"
              onClick={() => showModal(record)}
            >
              View details
            </Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button className="bg-transparent text-white rounded">
                {record.status} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loading />; // Fixed missing return

  return (
    <div className="px-3 py-4">
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
            dataSource={filteredData}
            columns={columns}
            loading={isLoading}
            size="middle"
            pagination={{
              onChange: (page) => setPage(page),
              pageSize: orderList?.data?.meta?.limit,
              total: orderList?.data?.meta?.total,
            }}
          />
        </div>
        {selectedOrder && (
          <OrderDetailsModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            data={selectedOrder}
          />
        )}
      </ConfigProvider>
    </div>
  );
}

export default OrderManagement;
