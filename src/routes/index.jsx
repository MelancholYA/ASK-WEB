import { createBrowserRouter } from "react-router-dom";
import Auth from "../views/auth";
import Layout from "../layout";
import Posts from "../views/Posts";
import ProtectForUsers from "../ProtectedRoutes/ProtectForUsers";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <ProtectForUsers Element={Layout} />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
    ],
  },
]);

export { router };
