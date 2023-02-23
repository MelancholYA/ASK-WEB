import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const navbarData = [
  {
    label: "Posts",
    path: "/",
    icon: "home",
  },
  {
    label: "Groups",
    path: "/groups",
    icon: "users",
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: "bell",
  },
  {
    label: "Messages",
    path: "/messages",
    icon: "message",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: "user",
  },
];

const index = () => {
  return (
    <div>
      <Navbar data={navbarData} />

      <Outlet />
    </div>
  );
};

export default index;
