import { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  // Keep track of page user is on at any moment
  const [current, setCurrent] = useState("");

  const onMenuClick = (e) => {
    const { key } = e;
    console.log(key);
    setCurrent(key);
  };

  const menuItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: <Link href="/">Home</Link>,
      className: "typewriter",
    },
    {
      key: "login",
      icon: <LoginOutlined />,
      label: <Link href="/login">Login</Link>,
      className: "typewriter",
    },
    {
      key: "register",
      icon: <UserAddOutlined />,
      label: <Link href="/register">Register</Link>,
      className: "typewriter",
    },
  ];

  useEffect(() => {
    let cleanpath = window.location.pathname;
    while (cleanpath.charAt(0) === "/") {
      cleanpath = cleanpath.substring(1);
    }
    typeof window !== "undefined" && setCurrent(cleanpath);
  }, [typeof window !== "undefined" && window.location.pathname]);

  return (
    <Menu
      items={menuItems}
      mode="horizontal"
      onClick={onMenuClick}
      selectedKeys={current}
    />
  );
};

export default TopNav;
