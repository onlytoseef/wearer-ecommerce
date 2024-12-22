import React from "react";
import { Layout, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Outlet } from "react-router-dom";

import Logo from "../../assets/images/Logo/Logo.svg";

const { Header, Content, Sider } = Layout;

const Home = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: <Link to="/admin">Home</Link>,
    },
    {
      key: "/admin/orders",
      icon: <LaptopOutlined />,
      label: <Link to="/admin/orders">Track Order</Link>,
    },
    {
      key: "/admin/addProduct",
      icon: <NotificationOutlined />,
      label: <Link to="/admin/addProduct">Add Product</Link>,
    },
  ];

  return (
    <Layout className="min-h-[100vh]">
      <Sider
        className="bg-primary text-primary"
        collapsible
        breakpoint="lg"
        collapsedWidth="60"
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
            <Outlet /> {/* Render child routes here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
