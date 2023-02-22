import { createBrowserRouter } from "react-router-dom";
import Auth from "../views/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
]);

export { router };
