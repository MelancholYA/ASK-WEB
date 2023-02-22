import React, { createContext, useEffect } from "react";
import { useStorage } from "../hooks/useStorage";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const { getStorageData } = useStorage();
  const [userData, setUserData] = React.useState(
    getStorageData({ key: "askUserData", isObj: true })
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
