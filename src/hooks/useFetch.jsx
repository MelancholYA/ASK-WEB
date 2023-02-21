import { Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const baseUrl = "http://localhost:5000/api/";

const usePost = ({ path, query, successMessage }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutate = useMutation(
    (payload) => axios.post(baseUrl + path, payload, {}),
    {
      onError: (err) => {
        const errMessage =
          err?.response?.data?.message || "something went wrong";
        enqueueSnackbar(errMessage, { variant: "error" });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(query);
        enqueueSnackbar(successMessage, {
          variant: "success",
          autoHideDuration: 3000,
        });
      },
    }
  );
  return { mutate };
};

// const useFetch = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const getData = ({ path, query }) => {
//     return useQuery(
//       [query],
//       () => axios.get(baseUrl + path).then((res) => res.data),
//       {
//         onError: (err) => {
//           console.log(err);
//           enqueueSnackbar(err.response.data, { variant: "error" });
//         },
//       }
//     );
//   };
//   const postData = ({ path, query, payload, successMessage }) => {

//   };
//   return { getData, postData };
// };

export { usePost };
