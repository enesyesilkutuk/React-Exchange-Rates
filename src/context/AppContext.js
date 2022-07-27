import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const [data, setData] = useState([]);
  const [currencyChange,setCurrencyChange] = useState("");

  const fetchData = async() => {
    const cachedResult = JSON.parse(localStorage.getItem("data"));
    let result;
    if (cachedResult) {
      result = cachedResult;
      console.log("cachedResult");
    } 
     else {
      result = await axios("http://hasanadiguzel.com.tr/api/kurgetir");
      console.log("VERİ ÇEKİLDİ");
      localStorage.setItem("data", JSON.stringify(result));
    }
    setData(result.data.TCMB_AnlikKurBilgileri);
  };

  useEffect(() => {
    fetchData();
    let newData = setInterval(() => {
      localStorage.clear();
      fetchData();
    }, 300000);
      return () => {
        if (newData) {
        clearInterval(newData);
      }
    };
  }, []);

  return <AppContext.Provider value={{data,setCurrencyChange,currencyChange}}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
