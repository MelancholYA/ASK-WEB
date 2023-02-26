import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useGet = (path, query) => {
  const { userData } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();
  return useQuery(
    [query],
    () =>
      axios
        .get(import.meta.env.VITE_APP_API_URL + path, {
          headers: { "x-auth-token": userData.token },
        })
        .then((res) => res.data),
    {
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      },
    }
  );
};
const usePost = ({ path, queries, successMessage }) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);
  return useMutation({
    mutationFn: async (newData) =>
      await axios.post(import.meta.env.VITE_APP_API_URL + path, newData, {
        headers: { "x-auth-token": userData.token },
      }),
    onError: (err) => {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queries] });
      if (successMessage) {
        enqueueSnackbar(successMessage, {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    },
  });
};

const useInfinite = ({ path, query }) => {
  const { userData } = useContext(UserContext);
  return useInfiniteQuery({
    queryKey: [query],
    queryFn: ({ pageParam = 0 }) =>
      axios
        .get(import.meta.env.VITE_APP_API_URL + path + pageParam, {
          headers: { "x-auth-token": userData.token },
        })
        .then((res) => {
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
};

export { useGet, usePost, useInfinite };
