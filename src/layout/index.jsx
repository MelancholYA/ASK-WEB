import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const navbarData = [
  {
    label: "Posts",
    path: "/",
    icon: "home",
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
