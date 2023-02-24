import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputBase,
} from "@mui/material";
import { useSnackbar } from "notistack";

import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { usePost } from "../hooks/cashe";

const Post = ({ postData, setFilter }) => {
  const [answerBody, setAnswerBody] = useState("");
  const { mutate } = usePost({
    path: "posts/answer",
    queries: ["answers", "posts"],
  });
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const handleSubmit = () => {
    if (!answerBody) {
      enqueueSnackbar("Please write your answer first", { variant: "error" });
      return;
    }
    mutate({
      userId: userData.user._id,
      body: answerBody,
      postId: postData._id,
    });
    setAnswerBody("");
  };

  return (
    <Grid item md={6} xs={12} sx={{ p: 1 }}>
      <div
        style={{
          boxShadow: "1px 1px 14px gainsboro",
          height: "max-content",
          borderRadius: 8,
        }}
      >
        {/* post header */}
        <Grid container alignItems="stretch" sx={{ p: 1 }}>
          <Grid item xs={1.5} sx={{ alignItems: "center", display: "flex" }}>
            <Avatar
              sizes="5px"
              alt={postData.user.firstName}
              src={postData?.user?.avatar}
            >
              {postData.user.firstName[0]}
            </Avatar>
          </Grid>
          <Grid item xs={7}>
            <Stack alignItems="start">
              <Typography variant="subtitle1">
                {`${postData.user.firstName} ${postData.user.lastName}`}
              </Typography>
              {postData?.group?.name && (
                <Typography variant="caption">
                  {`${postData?.group?.name} `}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Chip
              variant="outlined"
              label={postData.chip.label}
              onClick={() => setFilter(postData.chip.label)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginInline: 1 }} />
        {/* post body */}

        <Typography variant="body2" p={2}>
          {postData.body}
        </Typography>

        {/* post footer */}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            background: "#b6bac054",
            borderRadius: 2,
          }}
        >
          <IconButton>
            <FontAwesomeIcon color="#2D3F7B" icon="fa-solid fa-comment-dots" />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon color="#2D3F7B" icon="fa-solid fa-thumbs-up" />{" "}
          </IconButton>
          <Stack
            direction="row"
            sx={{
              boxShadow: "0 0 14px #7272722e",
              borderRadius: 100,
              m: 1,
              paddingInline: 1,
              alignItems: "center",
            }}
          >
            <InputBase
              value={answerBody}
              onSubmit={handleSubmit}
              onChange={(e) => setAnswerBody(e.target.value)}
              placeholder="Answer the question"
              sx={{ paddingInline: 1 }}
            />
            <IconButton onClick={handleSubmit}>
              <FontAwesomeIcon color="#2D3F7B" icon="fa-solid fa-reply" />{" "}
            </IconButton>
          </Stack>
          <Typography>{postData.answersLength} answers</Typography>
        </Stack>
      </div>
    </Grid>
  );
};

export default Post;
