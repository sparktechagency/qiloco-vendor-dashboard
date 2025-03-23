import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input } from "antd";
import { FiPlusCircle } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import AddProductModal from "./AddProductModal";
import { SearchOutlined } from "@ant-design/icons";
import ProdductDetailsModal from "./ProdductDetailsModal";
import { useProductQuery } from "../../../redux/apiSlices/productSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";

function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data, isLoading, isError } = useProductQuery();
  const productList = data?.data?.products || []; // Fix: Access correct path

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const searchableFields = ["name", "potency", "origin", "type"];

  const filteredData = productList.filter((item) =>
    Object.entries(item).some(([key, value]) => {
      if (key === "image" || key === "_id") return false; // Exclude image and ID
      if (!value) return false;
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const dataSource = filteredData.map((item, index) => ({
    ...item,
    key: item._id,
    serial: `#${index + 1}`,
    productName: item.name,
    productPotency: item.potency,
    productPrice: `$${item.price.toFixed(2)}`,
    productGenetics: item.genetics,
    productOrigin: item.origin,
    productType: item.type,
    productScent: item.scent,
    productDescription: item.description,
    createdAt: new Date(item.createdAt).toLocaleString(),
    productImg: item.image?.[0] || "https://via.placeholder.com/50", // Fallback if image is undefined
  }));

  return (
    <div className="px-3 py-4">
      <div className="text-white flex justify-between mb-4">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBgBase: "black",
                colorBgContainer: "black",
                colorBgBaseHover: "black",
                activeBg: "black",
                colorBorder: "transparent",
                colorPrimaryBorder: "transparent",
                boxShadow: "none",
              },
              Button: {
                defaultHoverBorderColor: "#a01d25",
              },
            },
          }}
        >
          <Input
            placeholder="Search here..."
            className="w-1/3 bg-black border-none outline-none text-sm text-slate-300"
            prefix={<SearchOutlined className="text-[#5e5e5e] text-lg pl-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ConfigProvider>
        <button
          className="h-12 flex items-center justify-center gap-4 px-10 bg-quilocoP rounded-lg"
          onClick={showModal}
        >
          <FiPlusCircle size={22} />
          Add New Product
        </button>
      </div>
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
            Button: {
              defaultBg: "#a01d25",
            },
          },
        }}
      >
        <div className="custom-table">
          <Table
            dataSource={dataSource}
            columns={columns(showDetailsModal)}
            pagination={true}
            loading={isLoading}
          />
        </div>
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ProdductDetailsModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          record={selectedProduct}
        />
      </ConfigProvider>
    </div>
  );
}

export default ProductList;

const columns = (showDetailsModal) => [
  {
    title: "Sl#",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <Avatar
          shape="square"
          size="default"
          src={getImageUrl(record?.productImg)} // Using the function to get image URL
        />
        <span>{record.productName}</span>
      </div>
    ),
  },
  {
    title: "Potency",
    dataIndex: "productPotency",
    key: "productPotency",
  },
  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
  },
  {
    title: "Genetics",
    dataIndex: "productGenetics",
    key: "productGenetics",
  },
  {
    title: "Origin",
    dataIndex: "productOrigin",
    key: "productOrigin",
  },
  {
    title: "Type",
    dataIndex: "productType",
    key: "productType",
  },
  {
    title: "Scent",
    dataIndex: "productScent",
    key: "productScent",
  },
  {
    title: "Description",
    dataIndex: "productDescription",
    key: "productDescription",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Details",
    key: "action",
    render: (_, record) => (
      <button
        className="hover:text-[#a11d26]"
        onClick={() => showDetailsModal(record)}
      >
        <IoEye size={24} />
      </button>
    ),
  },
];
