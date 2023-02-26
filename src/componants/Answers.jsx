import {
  Button,
  Divider,
  LinearProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useGet, useInfinite } from "../hooks/cashe";

const Answers = ({ handleClose, postId }) => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  } = useInfinite({
    path: `posts/${postId}/answers/`,
    query: "answers/" + postId,
  });
  const hasNextPage = data?.pages[data?.pages.length - 1].hasNextPage;

  const answers = data?.pages.map((page) => page.answers).flat();

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

          borderRadius: 1,
          minWidth: 400,
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <Typography
          sx={{ position: "sticky", top: 0, p: 1, backgroundColor: "white" }}
          align="center"
          variant="subtitle1"
        >
          ANSWERS
        </Typography>
        <Divider />
        {isFetching && <LinearProgress />}
        <div style={{ padding: 8 }}>
          {data &&
            answers.map((answer, i) => (
              <Stack
                key={`postAnswer-${answer._id}`}
                sx={{
                  m: 1,
                  p: 1,
                  p: "5px 10px",
                  background: "#8080802e",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1">
                  {answer.user.firstName}
                </Typography>
                <Typography pl={1} variant="caption">
                  {answer.body}
                </Typography>
              </Stack>
            ))}
          {hasNextPage && (
            <Button
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              fullWidth
            >
              Load More
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default Answers;
