import React from "react";
import { Modal, ConfigProvider, Button } from "antd";

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
            colorBgBase: "black",
            colorBgContainer: "black",
            colorBgBaseHover: "black",
            activeBg: "black",
            colorBorder: "transparent",
            colorPrimaryBorder: "transparent",
            boxShadow: "none",
          },
          Button: {
            defaultBg: "transparent",
            defaultColor: "#ffffff",
            defaultHoverBg: "#910e14",
            defaultHoverColor: "#ffffff",
            defaultActiveColor: "#ffffff",
            defaultHoverBorderColor: "none",
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
        {/* {record ? (
          <div>
            <p>
              <strong>Product Name:</strong> {record.productname}
            </p>
            <p>
              <strong>Serial:</strong> {record.serial}
            </p>
            <p>
              <strong>Filter:</strong> {record.filter}
            </p>
            <p>
              <strong>Amount:</strong> {record.ammount}
            </p>
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            <p>
              <strong>Description:</strong> {record.description}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )} */}

        <div className="w-full bg-transparent mt-6 p-6">
          <div className="flex justify-center items-start gap-10 pr-28 text-white">
            <img
              alt="Product Image"
              src={record?.productImg}
              className="w-40 h-28 rounded-lg border-2"
            />
            <div className="w-80">
              <h3 className="text-3xl font-semibold">{record?.productName}</h3>
              <h3 className="text-lg font-medium text-yellow-500">
                {record?.productPrice}
              </h3>
              <div className="flex flex-col gap-2 w-full">
                <p className="w-full flex items-start gap-32 bg-[#121315] rounded-md py-1 px-1.5">
                  Potency
                  <p>
                    :<span className="ml-2">{record?.productPotency}</span>
                  </p>
                </p>
                <p className="w-full flex items-start gap-32 bg-[#121315] rounded-md py-1 px-1.5">
                  Genetics
                  <p>
                    :<span className="ml-2">{record?.productGenetics}</span>
                  </p>
                </p>

                <p className="w-full flex items-start gap-32 bg-[#121315] rounded-md py-1 px-1.5">
                  Origin
                  <p>
                    :<span className="ml-2">{record?.productOrigin}</span>
                  </p>
                </p>

                <p className="w-full flex items-start gap-32 bg-[#121315] rounded-md py-1 px-1.5">
                  Type
                  <p>
                    :<span className="ml-2">{record?.productType}</span>
                  </p>
                </p>
                <p className="w-full flex items-start gap-32 bg-[#121315] rounded-md py-1 px-1.5">
                  Scent
                  <p>
                    :<span className="ml-2">{record?.productScent}</span>
                  </p>
                </p>
                <Button className="w-1/2 h-5">Buy now</Button>
              </div>
            </div>
          </div>
          <div className="w-full pl-10 mt-6">
            <p className="text-paragraph">
              <span className="text-sm text-slate-300 ">
                Product Description: &nbsp;
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              placeat iste voluptates cumque qui consectetur laudantium labore
              quas fugiat, ad exercitationem officiis! Nulla soluta accusamus
              ratione quibusdam iure dolores delectus neque similique deleniti
              aliquam aut fugit voluptatibus, reprehenderit debitis. Ducimus
              eligendi qui iusto, rem asperiores alias impedit molestiae, nulla
              nobis, officiis culpa assumenda eveniet vel quae laborum dolore
              exercitationem! Obcaecati.
            </p>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProdductDetailsModal;
