import React, { createContext, useEffect } from "react";
import { useStorage } from "../hooks/useStorage";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const { getStorageData } = useStorage();

  useEffect(() => {
    const user = getStorageData({ key: "askUserData", isObj: true });
    setUserData(user);
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
