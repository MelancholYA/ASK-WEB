import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Chip,
  Divider,
  Fab,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { usePost } from "../hooks/cashe";
import { filters } from "./PostsSideBar";

const NewPost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({
    body: "",
    label: "",
  });
  const { mutate, isLoading, isSuccess } = usePost({
    path: "posts/new",
    payload: post,
    query: "posts",
    successMessage: "Post created Succesfully",
  });

  const submit = () => {
    if (!post.body || !post.label) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }
    mutate({ body: post.body, chip: { label: post.label, icon: post.label } });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setPost({ body: "", label: "" });
    }
  }, [isSuccess]);

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        sx={{ position: "absolute", bottom: 10, right: 10 }}
      >
        <FontAwesomeIcon icon="fa-solid fa-pen" />
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography variant="subtitle2">New Post</Typography>
          <Divider sx={{ marginBlock: 2 }} />
          <TextField
            value={post.body}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, body: e.target.value }))
            }
            fullWidth
            label="New post body"
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginBlock: 2 }}
            justifyContent="space-between"
          >
            {filters.map((filter) => (
              <Chip
                onClick={() => setPost((prev) => ({ ...prev, label: filter }))}
                clickable
                variant={filter === post.label ? "outlined" : "filled"}
                label={filter}
              />
            ))}
          </Stack>
          <Button
            onClick={submit}
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default NewPost;
