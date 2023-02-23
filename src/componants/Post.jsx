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

import React from "react";

const Post = ({ postData, setFilter }) => {
  return (
    <Grid
      item
      md={5}
      xs={12}
      sx={{
        boxShadow: "1px 1px 14px gainsboro",
        borderRadius: 2,
        height: "max-content",
        m: 1,
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
            placeholder="Answer the question"
            sx={{ paddingInline: 1 }}
          />
          <IconButton>
            <FontAwesomeIcon color="#2D3F7B" icon="fa-solid fa-reply" />{" "}
          </IconButton>
        </Stack>
        <Typography>{postData.answersLength} answers</Typography>
      </Stack>
    </Grid>
  );
};

export default Post;
