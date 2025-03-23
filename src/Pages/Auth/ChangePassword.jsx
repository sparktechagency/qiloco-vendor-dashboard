import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../redux/apiSlices/authSlice";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form] = Form.useForm();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const onFinish = async (values) => {
    try {
      const response = await changePassword(values).unwrap();
      // Log the complete response to console
      console.log("Password change response:", response);

      if (response.status) {
        toast.success(response.message);
        form.resetFields();
        // Navigate to login page after successful password change
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-xl font-semibold flex items-center gap-1 cursor-pointer"
          onClick={handleGoBack}
        >
          <IoArrowBackCircleOutline size={26} className="font-medium" />
          Change Password
        </h1>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="w-[50%] mx-auto mt-20"
      >
        <Form.Item
          name="currentPass"
          label="Current Password"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            placeholder="Enter current password"
            className="h-12 placeholder:text-gray-500"
          />
        </Form.Item>

        <Form.Item
          name="newPass"
          label="New Password"
          rules={[
            { required: true, message: "Please enter a new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value === getFieldValue("currentPass")) {
                  return Promise.reject(
                    "The new password cannot be the same as the current one"
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter new password"
            className="h-12 placeholder:text-gray-500"
          />
        </Form.Item>

        <Form.Item
          name="confirmPass"
          label="Confirm Password"
          dependencies={["newPass"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPass") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm new password"
            className="h-12 placeholder:text-gray-500"
          />
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            htmlType="submit"
            block
            loading={isLoading}
            style={{
              width: "100%",
              height: 48,
              fontWeight: "400px",
              background: "#023f86",
              color: "#FCFCFC",
            }}
            className="roboto-medium text-sm leading-4"
          >
            {isLoading ? "Changing..." : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
