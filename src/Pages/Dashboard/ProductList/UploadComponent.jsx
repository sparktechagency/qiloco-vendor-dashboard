// import React, { useState } from "react";
// import { Upload, Image, Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { AiOutlineDelete } from "react-icons/ai";
// import { RiUploadCloud2Line } from "react-icons/ri";

// const UploadComponent = ({ onFileUpload }) => {
//   const [fileList, setFileList] = useState([]);

//   const handleChange = ({ fileList }) => {
//     setFileList(fileList);
//     onFileUpload(fileList.map((file) => file.originFileObj)); // Pass files to parent
//   };

//   const handleDelete = (file) => {
//     const updatedList = fileList.filter((item) => item.uid !== file.uid);
//     setFileList(updatedList);
//     onFileUpload(updatedList.map((file) => file.originFileObj)); // Update parent state
//   };

//   const uploadButton = (
//     <div className="text-[#575858] flex flex-col items-center justify-center">
//       <RiUploadCloud2Line size={30} />
//       <div className=" mt-3 leading-4">
//         Drop your imager here, or browse
//         <br /> Jpeg, png are allowed
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       {/* Upload Component */}

//       <Upload
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={handleChange}
//         showUploadList={false} // Hide default upload list
//         beforeUpload={() => false} // Prevent automatic upload
//         style={{ background: "black", color: "white" }}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>

//       {/* Display Uploaded Images Below */}
//       <div
//         style={{
//           marginTop: 10,
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         {fileList.map((file) => (
//           <div
//             key={file.uid}
//             style={{
//               position: "relative",
//               display: "flex",
//               alignItems: "center",
//             }}
//             className="w-full flex justify-between border rounded-md p-1.5"
//           >
//             <Image
//               src={URL.createObjectURL(file.originFileObj)}
//               width={60}
//               height={60}
//               style={{ borderRadius: "5px", objectFit: "cover" }}
//             />
//             <p>{file.name}</p>
//             <Button
//               onClick={() => handleDelete(file)}
//               icon={<AiOutlineDelete size={30} />}
//               className="bg-transparent border-none text-gray-300"
//             ></Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UploadComponent;

import React, { useState } from "react";
import { Upload, Image, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";

const UploadComponent = ({ onFileUpload }) => {
  const [fileList, setFileList] = useState([]);

  // Handle file change
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    onFileUpload(fileList.map((file) => file.originFileObj)); // Pass files to parent
  };

  // Handle file deletion
  const handleDelete = (file) => {
    const updatedList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedList);
    onFileUpload(updatedList.map((file) => file.originFileObj)); // Update parent state
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

  return (
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
              src={URL.createObjectURL(file.originFileObj)}
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
  );
};

export default UploadComponent;
