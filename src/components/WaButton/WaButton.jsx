import React from "react";
import { Button } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const WhaButton = () => {
  const phoneNumber = "YOUR_PHONE_NUMBER"; // Replace with your WhatsApp number

  return (
    <a
      href={`https://wa.me/${+923144642896}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        className="bg-green-500 hover:bg-green-600 shadow-lg"
        icon={<WhatsAppOutlined style={{ fontSize: "24px" }} />}
      />
    </a>
  );
};

export default WhaButton;
