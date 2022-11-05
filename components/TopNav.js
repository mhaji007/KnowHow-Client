import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const menuItems = [
  {
    key: "/",
    icon: <AppstoreOutlined />,
    label: <Link href="/"> App</Link>,
  },
  {
    key: "/login",
    icon: <LoginOutlined />,
    label: <Link href="/login"> Login</Link>,
  },
  {
    key: "/register",
    icon: <UserAddOutlined />,
    label: <Link href="/register"> Register</Link>,
  },
];

function TopNav() {
  return <Menu mode="horizontal" items={menuItems} />;
}

export default TopNav;
