import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Container, Fab, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewPost from "../componants/NewPost";
import Post from "../componants/Post";
import PostsSideBar from "../componants/PostsSideBar";
import { useGet } from "../hooks/cashe";

const Posts = () => {
  const [filter, setFilter] = useState(null);
  const [posts, setPosts] = useState([]);
  const { data, isLoading, isError, error, isFetching } = useGet(
    "posts/1",
    "posts"
  );

  useEffect(() => {
    if (data) {
      if (!filter) {
        setPosts(data.posts);
      } else {
        setPosts(data.posts.filter((post) => post.chip.label === filter));
      }
    }

    return () => {
      setPosts([]);
    };
  }, [filter, data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong</h1>;
  return (
    <>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
        >
          <LinearProgress
            sx={{ position: "absolute", width: "100%", top: 0 }}
          />
        </Backdrop>
      </>

      <NewPost />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <PostsSideBar filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid
          item
          container
          xs={10}
          sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
            height: "fitContent",
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
          {posts.map((post) => (
            <Post postData={post} setFilter={setFilter} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
