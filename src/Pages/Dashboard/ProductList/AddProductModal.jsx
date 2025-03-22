import React, { useState } from "react";
import { Modal, Form, Input, Button, ConfigProvider } from "antd";
import UploadComponent from "./UploadComponent";

function AddProductModal({ isModalOpen, setIsModalOpen, addProduct }) {
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    // Form values and uploaded files
    const newProduct = {
      ...values,
      images: uploadedFiles,
      key: Date.now().toString(),
    };
    addProduct(newProduct); // Passing the new product to the parent component
    form.resetFields(); // Reset the form fields after submission
    setIsModalOpen(false); // Close the modal
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
          Form: {
            labelColor: "#efefef",
          },
          Input: {
            colorBgBase: "black",
            colorBgContainer: "black",
            colorBgBaseHover: "black",
            activeBg: "black",
            colorBorder: "transparent",
            colorPrimaryBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Modal
        title="Add Product Details"
        open={isModalOpen}
        onOk={handleOk}
        width={1000}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          className="flex flex-col"
          style={{ padding: 5, marginBlockStart: 15 }}
          onFinish={onFinish}
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: "Product Name required!" }]}
              >
                <Input
                  placeholder="Enter your product Name"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Potency"
                name="productPotency"
                rules={[{ required: true, message: "Potency required!" }]}
              >
                <Input
                  placeholder="Enter Product Potency"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Genetics"
                name="productGenetics"
                rules={[{ required: true, message: "Genetics required!" }]}
              >
                <Input
                  placeholder="Enter Product Genetics"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="productOrigin"
                rules={[
                  { required: true, message: "Product Origin required!" },
                ]}
              >
                <Input
                  placeholder="Enter your product Origin"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Type"
                name="productType"
                rules={[{ required: true, message: "Product Type required!" }]}
              >
                <Input
                  placeholder="Enter your product Type"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item label="Scent" name="productScent">
                <Input
                  placeholder="Enter your product Scent"
                  className="bg-black border-none h-12 text-slate-300"
                />
              </Form.Item>
            </div>

            <div className="w-1/2">
              <Form.Item
                label="Product Price"
                name="productPrice"
                rules={[
                  {
                    required: true,
                    message: "Product Price required!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your product Price"
                  className="bg-black border-none h-12 text-slate-300"
                  onInput={(e) => {
                    // Only allow numeric input (including decimal point)
                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Product Descriptions"
                name="productDescription"
                rules={[
                  { required: true, message: "Product Description required!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Write your product Description"
                  className="border-none text-slate-300"
                  style={{
                    resize: "none",
                    height: "175px",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Product Gallery"
                name="productImage"
                rules={[
                  {
                    required: uploadedFiles.length === 0, // Make image required only if no image is uploaded
                    message: "Product Image required!",
                  },
                ]}
              >
                <UploadComponent onFileUpload={setUploadedFiles} />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <button
              type="submit"
              className="w-full h-12 bg-quilocoD hover:bg-quilocoD/90 text-white text-[18px] font-medium rounded-lg"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default AddProductModal;
