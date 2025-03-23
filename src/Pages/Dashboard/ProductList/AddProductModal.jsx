// import React, { useState } from "react";
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Button,
//   ConfigProvider,
//   Upload,
//   Image,
//   message,
// } from "antd";
// import { AiOutlineDelete } from "react-icons/ai";
// import { RiUploadCloud2Line } from "react-icons/ri";
// import { useCreateProductMutation } from "../../../redux/apiSlices/productSlice";

// function AddProductModal({ isModalOpen, setIsModalOpen }) {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const [focusedField, setFocusedField] = useState(null); // Track focused field
//   const [createProduct, { isLoading }] = useCreateProductMutation();

//   const resetForm = () => {
//     form.resetFields(); // Reset all input fields
//     setFileList([]); // Clear uploaded images
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   // Handle file change
//   const handleChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   // Handle file deletion
//   const handleDelete = (file) => {
//     const updatedList = fileList.filter((item) => item.uid !== file.uid);
//     setFileList(updatedList);
//   };

//   // Validate file type (only jpeg and png)
//   const beforeUpload = (file) => {
//     const isImage = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isImage) {
//       message.error("You can only upload JPG/PNG file!");
//     }
//     return isImage;
//   };

//   const uploadButton = (
//     <div className="text-[#575858] flex flex-col items-center justify-center">
//       <RiUploadCloud2Line size={30} />
//       <div className="mt-3 leading-4">
//         Drop your image here, or browse
//         <br /> Jpeg, PNG are allowed
//       </div>
//     </div>
//   );

//   const onFinish = async (values) => {
//     const formData = new FormData();

//     // Append the 'image' as a single file
//     if (fileList.length > 0) {
//       formData.append("image", fileList[0].originFileObj);
//     }

//     // Create the data object and append it to FormData
//     const productData = {
//       name: values.productName,
//       description: values.productDescription,
//       price: values.productPrice,
//       quality: values.productQuality,
//       quantity: values.productQuantity,
//       potency: values.productPotency,
//       genetics: values.productGenetics,
//       origin: values.productOrigin,
//       type: values.productType,
//       scent: values.productScent,
//       moodTag: values.filterMood,
//     };

//     // Append the 'data' object to the FormData
//     formData.append("data", JSON.stringify(productData));

//     // Console log the FormData content (for debugging purposes)
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       // Send data to the server using the mutation
//       const response = await createProduct(formData).unwrap();
//       console.log(response);
//       message.success("Product created successfully!");

//       // Reset form and close modal after successful submission
//       resetForm();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to create product:", error);
//       message.error("Failed to create product. Please try again.");
//     }
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Modal: {
//             contentBg: "#232323",
//             headerBg: "#232323",
//             titleColor: "#ffffff",
//             titleFontSize: 24,
//           },
//           Form: {
//             labelColor: "#efefef",
//           },
//           Select: {
//             selectorBg: "black",
//             activeOutlineColor: "grey",
//             optionSelectedBg: "grey",
//             multipleItemBorderColor: "grey",
//             activeBorderColor: "grey",
//             hoverBorderColor: "grey",
//           },
//           Input: {
//             hoverBg: "black",
//             colorBgBase: "black",
//             colorBgContainer: "black",
//             colorBgBaseHover: "black",
//             activeBg: "black",
//             colorBorder: "transparent",
//             colorPrimaryBorder: "transparent",
//             boxShadow: "none",
//           },
//         },
//       }}
//     >
//       <Modal
//         title="Add Product Details"
//         open={isModalOpen}
//         width={1000}
//         onCancel={handleCancel}
//         footer={null}
//         centered
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           className="flex flex-col"
//           style={{ padding: 5, marginBlockStart: 15 }}
//           onFinish={onFinish}
//         >
//           {/* Two Sections Side by Side */}
//           <div className="flex gap-4">
//             {/* Left Section */}
//             <div className="w-1/2 bg-transparent rounded-md">
//               <Form.Item
//                 label="Product Name"
//                 name="productName"
//                 rules={[{ required: true, message: "Product Name required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your product name"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productName" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productName")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Descriptions"
//                 name="productDescription"
//                 rules={[
//                   { required: true, message: "Product Description required!" },
//                 ]}
//               >
//                 <Input.TextArea
//                   placeholder="Write product description"
//                   className="border-none"
//                   style={{
//                     background:
//                       focusedField === "productDescription"
//                         ? "#e8f0fd"
//                         : "black",
//                   }}
//                   onFocus={() => setFocusedField("productDescription")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Price"
//                 name="productPrice"
//                 rules={[{ required: true, message: "Product Price required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your product price"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productPrice" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productPrice")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Quality"
//                 name="productQuality"
//                 rules={[
//                   { required: true, message: "Product Quality is required!" },
//                 ]}
//               >
//                 <Select
//                   defaultValue="high"
//                   className="w-full h-9"
//                   allowClear
//                   options={[
//                     {
//                       value: "high",
//                       label: "High",
//                     },
//                     {
//                       value: "medium",
//                       label: "Medium",
//                     },
//                   ]}
//                   placeholder="select it"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Quantity"
//                 name="productQuantity"
//                 rules={[
//                   { required: true, message: "Product Quantity required!" },
//                 ]}
//               >
//                 <Input
//                   placeholder="2 pc"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productQuantity" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productQuantity")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="filterMood"
//                 label="Filter by mood [Tag]"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select Tags",
//                     type: "array",
//                   },
//                 ]}
//               >
//                 <Select
//                   mode="multiple"
//                   placeholder="[Tag]"
//                   className="border-none"
//                   style={{
//                     background:
//                       focusedField === "filterMood" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("filterMood")}
//                   onBlur={() => setFocusedField(null)}
//                 >
//                   <Select.Option value="Chill">Chill</Select.Option>
//                   <Select.Option value="Soothing">Soothing</Select.Option>
//                   <Select.Option value="Euphoric">Euphoric</Select.Option>
//                   <Select.Option value="Creative">Creative</Select.Option>
//                   <Select.Option value="Happy">Happy</Select.Option>
//                   <Select.Option value="Sad">Sad</Select.Option>
//                   <Select.Option value="Medium">Medium</Select.Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item label="Potency" name="productPotency">
//                 <Input
//                   placeholder="Enter your Product Potency"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productPotency" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productPotency")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>
//             </div>

//             {/* Right Section (Upload) */}
//             <div className="w-1/2">
//               <Form.Item
//                 label="Genetics"
//                 name="productGenetics"
//                 rules={[{ required: true, message: "Genetics required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your Product Genetics"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productGenetics" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productGenetics")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Origin"
//                 name="productOrigin"
//                 rules={[{ required: true, message: "Origin required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your Product Origin"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productOrigin" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productOrigin")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Type"
//                 name="productType"
//                 rules={[{ required: true, message: "Type required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your Product Type"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productType" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productType")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Scent"
//                 name="productScent"
//                 rules={[{ required: true, message: "Scent required!" }]}
//               >
//                 <Input
//                   placeholder="Enter your Product Scent"
//                   className="border-none h-9"
//                   style={{
//                     background:
//                       focusedField === "productScent" ? "#e8f0fd" : "black",
//                   }}
//                   onFocus={() => setFocusedField("productScent")}
//                   onBlur={() => setFocusedField(null)}
//                 />
//               </Form.Item>

//               <h5 className="text-[18px] text-[#efefef] font-normal mb-1">
//                 Product Gallery
//               </h5>
//               <div>
//                 <Upload
//                   action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//                   listType="picture-card"
//                   fileList={fileList}
//                   onChange={handleChange}
//                   showUploadList={false} // Hide default upload list
//                   beforeUpload={beforeUpload} // Apply file type validation
//                   style={{ background: "black", color: "white" }}
//                 >
//                   {fileList.length >= 8 ? null : uploadButton}
//                 </Upload>

//                 {/* Display Uploaded Images Below */}
//                 <div
//                   style={{
//                     marginTop: 10,
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "10px",
//                   }}
//                 >
//                   {fileList.map((file) => (
//                     <div
//                       key={file.uid}
//                       style={{
//                         position: "relative",
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                       className="w-full flex justify-between border rounded-md p-1.5"
//                     >
//                       <Image
//                         src={URL.createObjectURL(file.originFileObj)}
//                         width={60}
//                         height={60}
//                         style={{ borderRadius: "5px", objectFit: "cover" }}
//                       />
//                       <p>{file.name}</p>
//                       <Button
//                         onClick={() => handleDelete(file)}
//                         icon={<AiOutlineDelete size={30} />}
//                         className="bg-transparent border-none text-gray-300"
//                       ></Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Full-Width Submit Button */}
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={isLoading}
//               className="w-full h-12 bg-quilocoD hover:bg-quilocoD/90 text-white text-[18px] font-medium rounded-lg"
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ConfigProvider>
//   );
// }

// export default AddProductModal;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  ConfigProvider,
  Upload,
  Image,
  message,
  Popconfirm,
} from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../../redux/apiSlices/productSlice";

function ProductModal({ isModalOpen, setIsModalOpen, editProduct = null }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  // Get all mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Determine if we're in edit mode
  const isEditMode = !!editProduct;

  // Set form values when in edit mode
  useEffect(() => {
    if (isEditMode && editProduct) {
      // Populate form with existing product data
      form.setFieldsValue({
        productName: editProduct.name,
        productDescription: editProduct.description,
        productPrice: editProduct.price,
        productQuality: editProduct.quality,
        productQuantity: editProduct.quantity,
        productPotency: editProduct.potency,
        productGenetics: editProduct.genetics,
        productOrigin: editProduct.origin,
        productType: editProduct.type,
        productScent: editProduct.scent,
        filterMood: editProduct.moodTag,
      });

      // If there's an existing image, add it to fileList
      if (editProduct.image) {
        setFileList([
          {
            uid: "-1",
            name: "existing-image.jpg",
            status: "done",
            url: editProduct.image,
            // This is a flag to indicate this is an existing image
            isExisting: true,
          },
        ]);
      }
    }
  }, [editProduct, form, isEditMode]);

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Handle file change
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Handle file deletion
  const handleDelete = (file) => {
    const updatedList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedList);
  };

  // Validate file type (only jpeg and png)
  const beforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isImage;
  };

  const uploadButton = (
    <div className="text-[#575858] flex flex-col items-center justify-center">
      <RiUploadCloud2Line size={30} />
      <div className="mt-3 leading-4">
        Drop your image here, or browse
        <br /> Jpeg, PNG are allowed
      </div>
    </div>
  );

  // Handler for product deletion
  const handleDeleteProduct = async () => {
    if (!editProduct || !editProduct.id) {
      message.error("Cannot delete product: No product ID provided");
      return;
    }

    try {
      await deleteProduct(editProduct.id).unwrap();
      message.success("Product deleted successfully!");
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product. Please try again.");
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    // Append the 'image' as a single file if it's a new upload
    if (fileList.length > 0 && !fileList[0].isExisting) {
      formData.append("image", fileList[0].originFileObj);
    }

    // Create the data object and append it to FormData
    const productData = {
      name: values.productName,
      description: values.productDescription,
      price: values.productPrice,
      quality: values.productQuality,
      quantity: values.productQuantity,
      potency: values.productPotency,
      genetics: values.productGenetics,
      origin: values.productOrigin,
      type: values.productType,
      scent: values.productScent,
      moodTag: values.filterMood,
    };

    // If we're editing, include the ID in the productData
    if (isEditMode && editProduct) {
      productData.id = editProduct.id;

      // Include flag to keep existing image if no new one was uploaded
      if (fileList.length > 0 && fileList[0].isExisting) {
        productData.keepExistingImage = true;
      }
    }

    // Append the 'data' object to the FormData
    formData.append("data", JSON.stringify(productData));

    try {
      let response;
      if (isEditMode) {
        // Update existing product
        response = await updateProduct(formData).unwrap();
        message.success("Product updated successfully!");
      } else {
        // Create new product
        response = await createProduct(formData).unwrap();
        message.success("Product created successfully!");
      }

      console.log(response);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} product:`,
        error
      );
      message.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } product. Please try again.`
      );
    }
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
          Select: {
            selectorBg: "black",
            activeOutlineColor: "grey",
            optionSelectedBg: "grey",
            multipleItemBorderColor: "grey",
            activeBorderColor: "grey",
            hoverBorderColor: "grey",
          },
          Input: {
            hoverBg: "black",
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
        title={isEditMode ? "Edit Product Details" : "Add Product Details"}
        open={isModalOpen}
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
          {/* Two Sections Side by Side */}
          <div className="flex gap-4">
            {/* Left Section */}
            <div className="w-1/2 bg-transparent rounded-md">
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: "Product Name required!" }]}
              >
                <Input
                  placeholder="Enter your product name"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productName" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productName")}
                  onBlur={() => setFocusedField(null)}
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
                  placeholder="Write product description"
                  className="border-none"
                  style={{
                    background:
                      focusedField === "productDescription"
                        ? "#e8f0fd"
                        : "black",
                  }}
                  onFocus={() => setFocusedField("productDescription")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="productPrice"
                rules={[{ required: true, message: "Product Price required!" }]}
              >
                <Input
                  placeholder="Enter your product price"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productPrice" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productPrice")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Quality"
                name="productQuality"
                rules={[
                  { required: true, message: "Product Quality is required!" },
                ]}
              >
                <Select
                  className="w-full h-9"
                  allowClear
                  options={[
                    {
                      value: "high",
                      label: "High",
                    },
                    {
                      value: "medium",
                      label: "Medium",
                    },
                  ]}
                  placeholder="select it"
                />
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="productQuantity"
                rules={[
                  { required: true, message: "Product Quantity required!" },
                ]}
              >
                <Input
                  placeholder="2 pc"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productQuantity" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productQuantity")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                name="filterMood"
                label="Filter by mood [Tag]"
                rules={[
                  {
                    required: true,
                    message: "Please select Tags",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="[Tag]"
                  className="border-none"
                  style={{
                    background:
                      focusedField === "filterMood" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("filterMood")}
                  onBlur={() => setFocusedField(null)}
                >
                  <Select.Option value="Chill">Chill</Select.Option>
                  <Select.Option value="Soothing">Soothing</Select.Option>
                  <Select.Option value="Euphoric">Euphoric</Select.Option>
                  <Select.Option value="Creative">Creative</Select.Option>
                  <Select.Option value="Happy">Happy</Select.Option>
                  <Select.Option value="Sad">Sad</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Potency" name="productPotency">
                <Input
                  placeholder="Enter your Product Potency"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productPotency" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productPotency")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
            </div>

            {/* Right Section (Upload) */}
            <div className="w-1/2">
              <Form.Item
                label="Genetics"
                name="productGenetics"
                rules={[{ required: true, message: "Genetics required!" }]}
              >
                <Input
                  placeholder="Enter your Product Genetics"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productGenetics" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productGenetics")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="productOrigin"
                rules={[{ required: true, message: "Origin required!" }]}
              >
                <Input
                  placeholder="Enter your Product Origin"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productOrigin" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productOrigin")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Type"
                name="productType"
                rules={[{ required: true, message: "Type required!" }]}
              >
                <Input
                  placeholder="Enter your Product Type"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productType" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productType")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Scent"
                name="productScent"
                rules={[{ required: true, message: "Scent required!" }]}
              >
                <Input
                  placeholder="Enter your Product Scent"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productScent" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productScent")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <h5 className="text-[18px] text-[#efefef] font-normal mb-1">
                Product Gallery
              </h5>
              <div>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  showUploadList={false} // Hide default upload list
                  beforeUpload={beforeUpload} // Apply file type validation
                  style={{ background: "black", color: "white" }}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>

                {/* Display Uploaded Images Below */}
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {fileList.map((file) => (
                    <div
                      key={file.uid}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="w-full flex justify-between border rounded-md p-1.5"
                    >
                      <Image
                        src={
                          file.isExisting
                            ? file.url
                            : URL.createObjectURL(file.originFileObj)
                        }
                        width={60}
                        height={60}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                      <p>{file.name}</p>
                      <Button
                        onClick={() => handleDelete(file)}
                        icon={<AiOutlineDelete size={30} />}
                        className="bg-transparent border-none text-gray-300"
                      ></Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            {/* Delete Button (only show in edit mode) */}
            {isEditMode && (
              <Popconfirm
                title="Delete Product"
                description="Are you sure you want to delete this product? This action cannot be undone."
                onConfirm={handleDeleteProduct}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{
                  danger: true,
                  loading: isDeleting,
                }}
              >
                <Button
                  danger
                  className="w-1/3 h-12 text-[18px] font-medium rounded-lg"
                >
                  Delete
                </Button>
              </Popconfirm>
            )}

            {/* Cancel Button */}
            <Button
              onClick={handleCancel}
              className="w-1/3 h-12 text-[18px] font-medium rounded-lg"
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
              className={`h-12 bg-quilocoD hover:bg-quilocoD/90 text-white text-[18px] font-medium rounded-lg ${
                isEditMode ? "w-1/3" : "w-2/3"
              }`}
            >
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductModal;
