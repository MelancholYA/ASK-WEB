import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectForUsers = ({ Element }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);
  if (!userData) {
    enqueueSnackbar("You're not authoorized ", { variant: "error" });
    return <Navigate to="/auth" replace={true} />;
  }

  return <Element />;
};

export default ProtectForUsers;
