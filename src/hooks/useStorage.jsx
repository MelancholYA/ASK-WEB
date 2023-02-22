import { useSnackbar } from "notistack";
import React from "react";

export const useStorage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const getStorageData = ({ key, isObj }) => {
    if (!key || !isObj) {
      enqueueSnackbar("Please specify the key and the type", {
        variant: "error",
      });
      return;
    }
    let dataObject = null;
    const data = localStorage.getItem(key);
    if (!data) {
      return;
    }
    if (isObj) {
      try {
        const pardsedData = JSON.parse(data);
        dataObject = pardsedData;
      } catch (error) {
        enqueueSnackbar("No data were found", { variant: "error" });
      }
    } else {
      dataObject.data = data;
    }

    return dataObject;
  };

  const saveStorageData = ({ key, data }) => {
    if (!data || !key) {
      enqueueSnackbar("Please specify the key and the data", {
        variant: "error",
      });

      return;
    }
    try {
      if (typeof data !== "string" || typeof data !== "number") {
        localStorage.setItem(key, JSON.stringify(data));
        return;
      }
      localStorage.setItem(key, data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return { getStorageData, saveStorageData };
};
