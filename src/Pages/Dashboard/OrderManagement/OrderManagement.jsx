// import React, { useState } from "react";
// import { Table, Avatar, ConfigProvider, Button, Dropdown, Menu } from "antd";
// import { FiPlusCircle } from "react-icons/fi";
// import { IoEye } from "react-icons/io5";
// import AddProductModal from "./ConfirmDeliveryModal";
// import Selects from "./Selects";
// function OrderManagement() {
//   const dataSource = rawData.map((item) => ({
//     ...item,
//     serial: `#${item.serial}`,
//   }));
//   const [selected, setSelected] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const filteredData = rawData
//     .filter((item) => selected === "All" || item.filter === selected)
//     .map((item) => ({
//       ...item,
//       serial: `#${item.serial}`,
//     }));

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };

//   const columns = [
//     {
//       title: "Sl#",
//       dataIndex: "serial",
//       key: "serial",
//     },
//     {
//       title: "Product Name",
//       dataIndex: "productname",
//       key: "productname",
//       render: (_, record) => (
//         <div className="flex items-center gap-2">
//           <Avatar shape="square" size="default" src={record.pic} />
//           <span>{record.productname}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Customer Name",
//       dataIndex: "customerName",
//       key: "customerName",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Amount",
//       dataIndex: "ammount",
//       key: "ammount",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         let color = "text-white";
//         if (status === "Pending") color = "text-yellow-400";
//         if (status === "Processing") color = "text-red-500";
//         if (status === "Delivered") color = "text-green-500";

//         return <span className={`${color} font-semibold`}>{status}</span>;
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => {
//         const menu = (
//           <Menu>
//             <Menu.Item key="1">Preparing</Menu.Item>
//             <Menu.Item key="2">Shipped</Menu.Item>
//             <Menu.Item key="3">Delivered</Menu.Item>
//           </Menu>
//         );

//         return (
//           <div className="flex items-center gap-2">
//             <Button className="bg-gray-700 text-white px-3 py-1 rounded">
//               View details
//             </Button>
//             <Dropdown overlay={menu} trigger={["click"]}>
//               <Button className="bg-gray-700 text-white px-3 py-1 rounded">
//                 Preparing ▼
//               </Button>
//             </Dropdown>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="px-3 py-4">
//       <ConfigProvider
//         theme={{
//           components: {
//             Table: {
//               headerBg: "#575858",
//               headerSplitColor: "none",
//               headerColor: "white",
//               borderColor: "#A3A3A3",
//               colorBgContainer: "#3a3a3a",
//               rowHoverBg: "#4a4a4a",
//               colorText: "white",
//             },
//           },
//         }}
//       >
//         <div className="custom-table">
//           <Table
//             dataSource={filteredData}
//             columns={columns}
//             pagination={true}

//             // rowClassName={() => "bg-gray-700 text-white"}
//           />
//         </div>
//         <AddProductModal
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//         />
//       </ConfigProvider>
//     </div>
//   );
// }

// export default OrderManagement;

// const rawData = [
//   {
//     key: "1",
//     serial: "001",
//     productname: "Wireless Mouse",
//     customerName: "Mike Johnson",
//     date: "2024-03-01",
//     ammount: "$25.99",
//     status: "Delivered",
//     pic: "https://via.placeholder.com/40", // Example placeholder image URL
//     filter: "Vice City",
//   },
//   {
//     key: "2",
//     serial: "002",
//     productname: "Mechanical Keyboard",
//     customerName: "John Doe",
//     date: "2024-03-02",
//     ammount: "$79.99",
//     status: "Pending",
//     pic: "https://via.placeholder.com/40",
//     filter: "Zkittles",
//   },
//   {
//     key: "3",
//     serial: "003",
//     productname: "Gaming Headset",
//     customerName: "Sarah Lee",
//     date: "2024-03-03",
//     ammount: "$59.99",
//     status: "Shipped",
//     pic: "https://via.placeholder.com/40",
//     filter: "Zkittles",
//   },
//   {
//     key: "4",
//     serial: "004",
//     productname: "USB-C Docking Station",
//     customerName: "Emily Smith",
//     date: "2024-03-04",
//     ammount: "$120.00",
//     status: "Processing",
//     pic: "https://via.placeholder.com/40",
//     filter: "Vice City",
//   },
// ];

import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Button, Dropdown, Menu } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import { IoEye } from "react-icons/io5";
import AddProductModal from "./ConfirmDeliveryModal";

function OrderManagement() {
  const [selected, setSelected] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(
    rawData.map((item) => ({
      ...item,
      serial: `#${item.serial}`,
    }))
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleStatusChange = (key, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredData = data.filter(
    (item) => selected === "All" || item.filter === selected
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
          <Avatar shape="square" size="default" src={record.pic} />
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
      dataIndex: "ammount",
      key: "ammount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "text-white";
        if (status === "Pending")
          color =
            "text-yellow-400 border border-yellow-400 bg-yellow-950  font-[300] text-[14px]  rounded-lg px-3 py-1";
        if (status === "Processing")
          color =
            "text-red-400 border border-red-400  bg-red-950 font-[300] text-[14px]  rounded-lg px-3 py-1";
        if (status === "Shipped")
          color =
            "text-sky-400 border border-sky-400 bg-sky-950 font-[300] text-[14px]  rounded-lg px-3 py-1";
        if (status === "Delivered")
          color =
            "text-teal-400 border border-teal-400 bg-teal-950 font-[300] text-[14px]  rounded-lg px-3 py-1";

        return <span className={`${color} font-semibold`}>{status}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.key, key)}>
            <Menu.Item key="Pending">Pending</Menu.Item>
            <Menu.Item key="Processing">Processing</Menu.Item>
            <Menu.Item key="Shipped">Shipped</Menu.Item>
            <Menu.Item key="Delivered">Delivered</Menu.Item>
          </Menu>
        );

        return (
          <div className="flex items-center gap-2 ">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveBorderColor: "none",
                    defaultHoverBg: "none",
                    defaultHoverBorderColor: "white",
                    defaultHoverColor: "white",
                    defaultActiveBg: "none",
                    defaultActiveColor: "#a01d25",
                    defaultShadow: "#a01d25",
                  },
                },
              }}
            >
              <Button
                className="bg-transparent text-white  rounded-lg"
                onClick={showModal}
              >
                View details
              </Button>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                className="w-24 rounded-lg"
              >
                <Button
                  className="bg-transparent text-white  rounded "
                  icon={<DownOutlined />}
                  iconPosition={"end"}
                >
                  {record.status}
                </Button>
              </Dropdown>
            </ConfigProvider>
          </div>
        );
      },
    },
  ];

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
          <Table dataSource={filteredData} columns={columns} pagination />
        </div>
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </ConfigProvider>
    </div>
  );
}

export default OrderManagement;

const rawData = [
  {
    key: "1",
    serial: "001",
    productname: "Wireless Mouse",
    customerName: "Mike Johnson",
    date: "2024-03-01",
    ammount: "$25.99",
    status: "Delivered",
    pic: "https://via.placeholder.com/40",
    filter: "Vice City",
  },
  {
    key: "2",
    serial: "002",
    productname: "Mechanical Keyboard",
    customerName: "John Doe",
    date: "2024-03-02",
    ammount: "$79.99",
    status: "Pending",
    pic: "https://via.placeholder.com/40",
    filter: "Zkittles",
  },
  {
    key: "3",
    serial: "003",
    productname: "Gaming Headset",
    customerName: "Sarah Lee",
    date: "2024-03-03",
    ammount: "$59.99",
    status: "Shipped",
    pic: "https://via.placeholder.com/40",
    filter: "Zkittles",
  },
  {
    key: "4",
    serial: "004",
    productname: "USB-C Docking Station",
    customerName: "Emily Smith",
    date: "2024-03-04",
    ammount: "$120.00",
    status: "Processing",
    pic: "https://via.placeholder.com/40",
    filter: "Vice City",
  },
];
