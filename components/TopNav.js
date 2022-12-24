import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Menu, SubMenu } from "antd";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppstoreOutlined,
  LoginOutlined,
  MenuOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Context } from "../context";

const { Item } = Menu;

const TopNav = () => {
  // Keep track of page user is on at any moment
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  // Destructure user for conditionally
  // displaying nav links
  const { user } = state;

  const router = useRouter();

  const onMenuClick = (e) => {
    const { key } = e;
    if (key === "logout") {
      logout();
    }
    console.log(key);
    setCurrent(key);
  };

  const userName = user && user.name;

  const hasUserMenuItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: <Link href="/">Home</Link>,
    },

    {
      label: userName,
      key: "SubMenu",
      icon: <MenuOutlined />,
      className: "ms-auto",
      children: [
        {
          key: "user",
          label: <Link href="/user">Dashboard</Link>,
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Logout",
        },
      ],
    },
  ];

  const hasNoUserMenuItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "login",
      icon: <LoginOutlined />,
      label: <Link href="/login">Login</Link>,
    },
    {
      key: "register",
      icon: <UserAddOutlined />,
      label: <Link href="/register">Register</Link>,
    },
  ];

  useEffect(() => {
    let cleanpath = window.location.pathname;
    while (cleanpath.charAt(0) === "/") {
      cleanpath = cleanpath.substring(1);
    }
    typeof window !== "undefined" && setCurrent(cleanpath);
  }, [typeof window !== "undefined" && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/logout`, {
      withCredentials: true,
    });
    toast.success(response.data.message);
    router.push("/login");
  };

  return (
    <Menu
      items={user ? hasUserMenuItems : hasNoUserMenuItems}
      mode="horizontal"
      onClick={onMenuClick}
      selectedKeys={current}
    />
  );
};

export default TopNav;
