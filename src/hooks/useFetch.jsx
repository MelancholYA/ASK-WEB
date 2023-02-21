import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

const baseUrl = "http://localhost:5000/api/";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const clearData = () => setData(null);
  const { enqueueSnackbar } = useSnackbar();

  const getData = async ({ path }) => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseUrl + path);

      setData(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async ({ path, payload }) => {
    setIsLoading(true);
    try {
      console.log(payload);
      const response = await axios.post(baseUrl + path, payload);
      setData(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return { getData, postData, clearData, data, isLoading };
};

export { useFetch };
