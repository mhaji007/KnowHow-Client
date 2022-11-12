import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

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
let isServer = (typeof window === "undefined")? false : true

function TopNav() {
  const router = useRouter();
  // Keep track of page user is on at any moment
  const [current, setCurrent] = useState("");
  useEffect(() => {
    setCurrent(router.pathname, console.log(current));
    console.log("router.pathname", router.pathname)
    console.log(isServer)
    console.log(current)
  }, [isServer && router.pathname]);

  const onMenuClick = (e) => {
    setCurrent(e.key,console.log("current from onClick",current));
  
  };

  return <Menu mode="horizontal" items={menuItems} onClick={onMenuClick} />;
}

export default TopNav;
