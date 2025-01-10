import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Alert } from "antd";
import { adminLogin } from "../../store/features/adminAuthSlice";

const { Title } = Typography;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    dispatch(adminLogin({ email, password }));
  };

  return (
    <div className="!font-monster shadow-lg max-w-[20rem] p-5 m-auto ">
      <Title className="font-monster" level={3} style={{ textAlign: "center" }}>
        Admin Login
      </Title>

      {error && (
        <Alert
          message="Login Failed"
          description="Invalid email or password. Please try again."
          type="error"
          showIcon
          style={{ marginBottom: "20px" }}
        />
      )}

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="bg-primary hover:!bg-green-700"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
