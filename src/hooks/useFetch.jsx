import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const clearData = () => setData(null);
  const { enqueueSnackbar } = useSnackbar();

  const getData = async ({ path }) => {
    setIsLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_APP_API_URL + path);
      setData(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async ({ path, payload }) => {
    console.log("hh");
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_API_URL + path,
        payload
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
      const errorbody = error.response
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(errorbody, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return { getData, postData, clearData, data, isLoading };
};

export { useFetch };
