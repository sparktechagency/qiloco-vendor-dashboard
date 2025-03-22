import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input } from "antd";
import { FiPlusCircle } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import AddProductModal from "./AddProductModal";
import { SearchOutlined } from "@ant-design/icons";

import ProdductDetailsModal from "./ProdductDetailsModal";

function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [products, setProducts] = useState(rawData); // State to hold the product list

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const searchableFields = columns(showDetailsModal).map(
    (col) => col.dataIndex
  );

  const filteredData = products.filter((item) =>
    searchableFields.some((field) => {
      if (!item[field]) return false;
      const fieldValue = item[field].toString().toLowerCase();
      const query = searchTerm.toLowerCase();
      if (field === "serial") {
        return fieldValue.includes(query.replace("#", ""));
      }
      return fieldValue.includes(query);
    })
  );

  const dataSource = filteredData.map((item) => ({
    ...item,
    serial: `#${item.serial}`,
  }));

  const addProduct = (newProduct) => {
    // Adding new product to the state (and updating the table instantly)
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

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
          />
        </div>
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addProduct={addProduct} // Passing the addProduct function to the modal
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

const rawData = [
  {
    key: "6",
    serial: "006",
    productName: "Gelato 33",
    productPotency: "Medium",
    productPrice: "$38.99",
    productGenetics: "Hybrid",
    productOrigin: "California",
    productType: "Hybrid",
    productScent: "Dessert-like Flavor",
    createdAt: "07 Mar 25, 09:00 AM",
    productDescription: "Hybrid, Dessert-like Flavor, THC 19%",
    productImg:
      "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/1820B/production/_106472889_hi051939557.jpg",
  },
  {
    key: "5",
    serial: "005",
    productName: "Sour Diesel",
    productPotency: "High",
    productPrice: "$44.99",
    productGenetics: "Sativa Dominant",
    productOrigin: "Oregon",
    productType: "Flower",
    productScent: "Strong Aroma",
    createdAt: "08 Mar 25, 06:30 PM",
    productDescription: "Sativa, Uplifting, Strong Aroma",
    productImg:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Macro_cannabis_bud.jpg",
  },
  {
    key: "2",
    serial: "002",
    productName: "Purple Haze",
    productPotency: "High",
    productPrice: "$39.99",
    productGenetics: "Sativa Dominant",
    productOrigin: "Colombia",
    productType: "Flower",
    productScent: "Berry Aroma",
    createdAt: "10 Mar 25, 08:15 PM",
    productDescription: "Sativa, Energizing, Berry Aroma",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tCHsL3YYsC9qQSZhrqRBfecifG1lVu8x9g&s",
  },
  {
    key: "8",
    serial: "008",
    productName: "Lemon Skunk",
    productPotency: "Medium",
    productPrice: "$33.99",
    productGenetics: "Sativa Dominant",
    productOrigin: "Mexico",
    productType: "Sativa",
    productScent: "Citrus, Skunky",
    createdAt: "05 Mar 25, 01:10 PM",
    productDescription: "Sativa, Citrus, Uplifting High",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwUxhkASQTeYfvjWKfzycjxZuVY3fgvHxcg&s",
  },
  {
    key: "4",
    serial: "004",
    productName: "Blue Dream",
    productPotency: "Medium",
    productPrice: "$36.99",
    productGenetics: "Hybrid",
    productOrigin: "USA",
    productType: "Hybrid",
    productScent: "Sweet",
    createdAt: "11 Mar 25, 02:00 PM",
    productDescription: "Hybrid, Creative, Mildly Sedative",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbX1mfPAINkcuYCG7HcNZfWvnAXCs6d8vFZw&s",
  },
  {
    key: "1",
    serial: "001",
    productName: "Vice City OG",
    productPotency: "Medium",
    productPrice: "$34.99",
    productGenetics: "Indica Dominant",
    productOrigin: "USA",
    productType: "Flower",
    productScent: "Citrusy",
    createdAt: "12 Mar 25, 10:30 AM",
    productDescription: "THCa, Citrus, Relaxing, Euphoric",
    productImg:
      "https://wpcdn.web.wsu.edu/news/uploads/sites/2797/2018/04/medical-marijuana.jpg",
  },
  {
    key: "3",
    serial: "003",
    productName: "Zkittlez Kush",
    productPotency: "High",
    productPrice: "$42.99",
    productGenetics: "Hybrid",
    productOrigin: "California",
    productType: "Hybrid",
    productScent: "Fruity",
    createdAt: "09 Mar 25, 04:45 PM",
    productDescription: "Indica, Relaxing, Fruity, THC 22%",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfAsm7W7szz1BK17clO2ulWMaohk06eJDcw&s",
  },
  {
    key: "7",
    serial: "007",
    productName: "Granddaddy Purple",
    productPotency: "Medium",
    productPrice: "$41.99",
    productGenetics: "Indica Dominant",
    productOrigin: "California",
    productType: "Indica",
    productScent: "Grape Aroma",
    createdAt: "06 Mar 25, 05:45 PM",
    productDescription: "Indica, Deep Relaxation, Grape Aroma",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntfv0JVxRPpJHoLJfQMvw1Sxfdb0xTJtDFw&s",
  },
];

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
    render: (_, record) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar
            shape="square"
            size="default"
            src={record.productImg}
            alt={record.productName}
            onError={(e) => {
              console.error("Image failed to load:", record.productImg);
              e.target.src = "https://via.placeholder.com/50";
            }}
          />
          <span>{record.productName}</span>
        </div>
      );
    },
  },
  {
    title: "Potency",
    dataIndex: "productPotency",
    key: "productPotency",
    filters: [
      { text: "Low", value: "Low" },
      { text: "Medium", value: "Medium" },
      { text: "High", value: "High" },
    ],
    onFilter: (value, record) => record.filter === value,
  },

  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
  },
  {
    title: "Generics",
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
