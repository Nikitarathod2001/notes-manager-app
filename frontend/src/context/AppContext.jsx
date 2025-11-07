import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("token-note") ? localStorage.getItem("token-note") : false
  );
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {

      const {data} = await axios.get(backendUrl + "/api/user/get-userdata", {headers: {token}});
      if(data.success) {
        setUserData(data.userData);
      }
      else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(token) {
      getUserData();
    }
  }, [token]);

  const value = {
    title, setTitle, backendUrl,
    content, setContent,
    token, setToken, userData, setUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;