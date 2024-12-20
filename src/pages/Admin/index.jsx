import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import AddProduct from "./AddProduct";
import AdminLogin from "./AdminLogin";
import TrackOrder from "./TrackOrder";
import Logo from "../../assets/images/Logo/Logo.svg";
const { Header, Content, Sider } = Layout;

const Index = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: (
        <Link
          className="!text-secondary  hover:!text-primary focus:!text-primary active:!text-primary"
          to="/admin"
        >
          Home
        </Link>
      ),
    },
    {
      key: "/admin/orders",
      icon: <LaptopOutlined />,
      label: (
        <Link
          className="!text-secondary  hover:!text-primary focus:!text-primary active:!text-primary"
          to="/admin/orders"
        >
          Track Order
        </Link>
      ),
    },
    {
      key: "/admin/addProduct",
      icon: <NotificationOutlined />,
      label: (
        <Link
          className="!text-secondary   hover:!text-primary focus:!text-primary active:!text-primary"
          to="/admin/addProducts"
        >
          Add Product
        </Link>
      ),
    },
  ];

  return (
    <Layout className="min-h-[100vh]">
      <Sider
        className="bg-primary text-primary"
        collapsible
        breakpoint="lg"
        collapsedWidth="100"
        width={250}
      >
        <div className="text-center">
          <img src={Logo} className="text-center m-auto" width={70} />
        </div>
        <Menu
          className="bg-primary text-center font-monster"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-primary text-center font-monster text-secondary text-2xl pt-[.8vh]">
          <h1>Admin Dashboard</h1>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/addProducts" element={<AddProduct />} />
              <Route path="/orders" element={<TrackOrder />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;