import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Container,
  Fab,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewPost from "../componants/NewPost";
import Post from "../componants/Post";
import PostsSideBar from "../componants/PostsSideBar";
import { useGet, useInfinite } from "../hooks/cashe";

const Posts = () => {
  const [filter, setFilter] = useState(null);
  const [pages, setPages] = useState([]);
  console.log("home page");
  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinite({
    path: "posts/",
    query: "posts",
  });
  const handleScroll = (event) => {
    if (isFetchingNextPage || isFetching) {
      return;
    }
    console.log("scrolling...");
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (data?.pages) {
      if (!filter) {
        setPages(data.pages);
      } else {
        setPages(data.pages.filter((post) => post.chip.label === filter));
      }
    }

    return () => {
      setPages([]);
    };
  }, [filter, data]);

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>Something went wrong</h1>;
  return (
    <>
      <NewPost />
      <Grid container spacing={[0, 0]}>
        <Grid item xs={2}>
          <PostsSideBar filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid
          onScroll={handleScroll}
          item
          xs={10}
          sx={{
            maxHeight: "calc(100vh - 60px)",
            overflow: "auto",
            position: "relative",
          }}
        >
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <LinearProgress
              sx={{ position: "absolute", width: "100%", top: 0 }}
            />
          </Backdrop>
          <Grid
            container
            wrap="wrap"
            sx={{
              height: "fit-content",
              justifyContent: "space-between",
            }}
            rowSpacing={0}
          >
            {pages.map((page) =>
              page.map((post) => (
                <Post key={post._id} postData={post} setFilter={setFilter} />
              ))
            )}
          </Grid>
          <Typography textAlign="center" variant="h6">
            {hasNextPage ? isFetchingNextPage && "Loading..." : "No more data"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
