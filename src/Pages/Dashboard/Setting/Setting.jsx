import React from "react";
import { Tabs, ConfigProvider } from "antd";

import AdminPassword from "./AdminPassword";
import Profile from "./Profile";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "profile",
    label: "Profile",
    children: <Profile />,
  },
  {
    key: "password",
    label: "Password",
    children: <AdminPassword />,
  },
];
function Setting() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: "white",
            inkBarColor: "#a11d26",
            itemHoverColor: "white",
            itemSelectedColor: "#a11d26",
            titleFontSize: "18px",
            horizontalMargin: "0 0 30px 0",
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="px-4 py-5 font-medium "
      />
    </ConfigProvider>
  );
}

export default Setting;
