import React from "react";
import { Modal, ConfigProvider, Button } from "antd";
import { getImageUrl } from "../../../components/common/ImageUrl";

function ProdductDetailsModal({ isModalOpen, setIsModalOpen, record }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#232323",
            headerBg: "#232323",
            titleColor: "#ffffff",
            titleFontSize: 24,
          },
          Button: {
            defaultBg: "transparent",
            defaultColor: "#ffffff",
            defaultHoverBg: "#910e14",
          },
        },
      }}
    >
      <Modal
        title="Product Details (User Preview)"
        open={isModalOpen}
        width={1000}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="w-full bg-transparent mt-6 p-6">
          {/* Product Image & Main Info */}
          <div className="flex justify-center items-start gap-10 pr-28 text-white">
            <img
              alt="Product"
              src={getImageUrl(record?.productImg) || record?.productName}
              className="w-40 h-28 rounded-lg border-2"
            />
            <div className="w-80">
              <h3 className="text-3xl font-semibold">
                {record?.productName || "N/A"}
              </h3>
              <h3 className="text-lg font-medium text-yellow-500">
                {record?.productPrice || "N/A"}
              </h3>

              {/* Product Details */}
              <div className="flex flex-col gap-2 w-full">
                {[
                  { label: "Potency", value: record?.productPotency },
                  { label: "Genetics", value: record?.productGenetics },
                  { label: "Origin", value: record?.productOrigin },
                  { label: "Type", value: record?.productType },
                  { label: "Scent", value: record?.productScent },
                  { label: "Created At", value: record?.createdAt },
                ].map((item, index) => (
                  <p
                    key={index}
                    className="w-full flex justify-between items-center bg-[#121315] rounded-md py-1 px-3"
                  >
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-white">{item.value || "N/A"}</span>
                  </p>
                ))}

                <Button className="w-1/2 h-5">Buy now</Button>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="w-full pl-10 mt-6">
            <p className="text-paragraph">
              <span className="text-sm text-slate-300">
                Product Description: &nbsp;
              </span>
              {record?.productDescription || "No description available."}
            </p>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProdductDetailsModal;
