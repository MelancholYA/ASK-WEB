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
  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = useInfinite({
    path: "posts/",
    query: "posts",
  });
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const isAtTheEnd = scrollTop + clientHeight >= scrollHeight;
    const isActiveNetwork = isFetchingNextPage || isFetching || isRefetching;
    if (isAtTheEnd && !isActiveNetwork) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (data?.pages) {
      if (!filter) {
        setPages(data.pages.flat());
      } else {
        setPages(
          data.pages.flat().filter((post) => post.chip.label === filter)
        );
      }
    }

    return () => {
      setPages([]);
    };
  }, [filter, data]);

  if (status === "loading") return <LinearProgress />;
  if (status === "error") return <h1>Something went wrong</h1>;
  console.log(status);
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
          }}
        >
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isFetchingNextPage}
          >
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                width: "100%",
              }}
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
            {pages.map((post) => (
              <Post key={post._id} postData={post} setFilter={setFilter} />
            ))}
          </Grid>
          <Typography textAlign="center" variant="h6">
            {!hasNextPage && "No more data"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
