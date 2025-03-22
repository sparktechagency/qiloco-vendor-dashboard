import React from "react";

import { Select, Space } from "antd";
function Selects() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="">
      <Select
        defaultValue="lucy"
        style={{
          width: 300,
          height: 20,
          color: "red",
        }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
          {
            value: "disabled",
            label: "Disabled",
            disabled: true,
          },
        ]}
      />
    </div>
  );
}

export default Selects;
