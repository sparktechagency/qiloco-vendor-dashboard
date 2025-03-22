import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, ConfigProvider } from "antd";
import { MdOutlineDateRange } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import man from "../../../assets/quiloco/man.png";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
function ConfirmDeliveryModal({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded images

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Form Data:", { ...values, images: uploadedFiles }); // Include images in form data
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
          },
          Button: {
            defaultBg: "#a01d25",
            defaultColor: "#ffffff",
            defaultHoverBg: "#910e14",
            defaultHoverColor: "#ffffff",
            defaultActiveColor: "#ffffff",
            defaultHoverBorderColor: "none",
            fontWeight: 700,
            defaultActiveBg: "#a01d25",
          },
        },
      }}
    >
      <Modal
        title="Confirm Delivery Details"
        open={isModalOpen}
        onOk={handleOk}
        width={1000}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="p-1">
          <div className="flex justify-between mt-4 ">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] font-semibold text-white">
                Orders ID:
              </h3>
              <div className="flex gap-2 items-center text-white">
                <SlCalender />
                Feb 16,2022 - Feb 20,2022
              </div>
            </div>

            <div className="flex gap-4 items-start ">
              <div>
                <img
                  src={man}
                  alt=""
                  width={50}
                  className="border rounded-lg"
                />
              </div>

              <div>
                <h4 className="text-[20px] font-semibold text-green-400">
                  Customer
                </h4>
                <p className="text-[16px] text-white font-medium">Full name:</p>
                <p className="text-[16px] text-white font-medium">
                  Email: {"Samuel@gmail.com"}
                </p>
                <p className="text-[16px] text-white font-medium">
                  Phone: {"+91 904 231 1212"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div>
              <div className="text-white">
                <h3 className="text-[24px] font-medium">Product Name</h3>
                <h3 className="text-[24px] font-bold">Vice City</h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[24px] text-white">Quantity: 2</h4>
                <h4 className="text-[24px] text-white font-bold w-40 p-1.5  rounded-md border flex justify-start items-center">
                  120 pcs
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-2 mr-4">
              <h3 className="text-[24px] font-medium text-white">
                Product Name
              </h3>
              <div className="border border-white rounded-full flex items-center justify-between w-40 px-4 py-1.5 text-white">
                <h3 className="text-[24px] font-medium ">$07.44</h3>
                <HiOutlineCurrencyDollar size={30} />
              </div>
              <div className="flex flex-col  h-40 items-center justify-start border rounded-lg p-1.5">
                <h3 className="text-[#00B047] text-[18px]">Uploaded Design</h3>
                <img src={man} width={100} height={100}></img>
              </div>
            </div>
          </div>
          <div>
            <Button className="border-none h-10 w-40 rounded-lg">
              Confirm Delivery
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ConfirmDeliveryModal;
