import { Divider, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useGet, useInfinite } from "../hooks/cashe";

const Answers = ({ handleClose, postId }) => {
  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfinite({ path: `posts/${postId}/`, query: "answers" });

  console.log({ data });
  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          backgroundColor: "white",
          transition: ".3s",
          p: 2,
          borderRadius: 1,
          minWidth: 400,
        }}
      >
        <Typography align="center" variant="subtitle1">
          ANSWERS
        </Typography>
        <Divider />
      </Box>
    </Modal>
  );
};

export default Answers;
