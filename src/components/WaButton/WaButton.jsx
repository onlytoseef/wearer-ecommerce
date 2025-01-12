import React from "react";
import { Button } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const WhaButton = () => {
  return (
    <a
      href={`https://wa.me/${+923084801871}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        className="bg-primary hover:bg-green-600 shadow-lg"
        icon={<WhatsAppOutlined style={{ fontSize: "50px" }} />}
      />
    </a>
  );
};

export default WhaButton;
