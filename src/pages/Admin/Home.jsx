import React from "react";
import { Layout, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Outlet } from "react-router-dom";

import Logo from "../../assets/images/Logo/Logo.svg";
import { useSelector } from "react-redux";

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

  const admin = useSelector((state) => state.adminAuth.user);
  const { displayName } = admin;

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
        <Header className="bg-primary items-center text-center justify-between  flex text-secondary ">
          <h1 className="text-lg font-secondary sm:text-[2rem]">
            Admin Dashboard
          </h1>

          <div className="text-sm">{displayName}</div>
        </Header>

        <Content>
          <div
            style={{ padding: 24, background: "#fff", minHeight: 360 }}
            className="min-h-[100vh]"
          >
            <Outlet /> {/* Render child routes here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
