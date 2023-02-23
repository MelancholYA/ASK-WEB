import { Button, Stack } from "@mui/material";
import React from "react";

export const filters = ["General", "Tech", "Romance", "Babies"];

const PostsSideBar = ({ filter, setFilter }) => {
  const handleClick = (filterLabel) => {
    console.log(filterLabel, filter);
    if (filterLabel === filter) {
      setFilter(null);
    } else {
      setFilter(filterLabel);
    }
  };
  return (
    <Stack
      spacing={1}
      sx={{
        height: "calc(100vh - 60px)",
        p: 2,
        overflow: "auto",
        boxShadow: "2px 1px 14px gainsboro",
        position: "sticky",
        top: 60,
      }}
    >
      {filters.map((filterLabel, i) => (
        <Button
          key={i}
          variant={filter === filterLabel ? "contained" : "outlined"}
          onClick={() => handleClick(filterLabel)}
        >
          {filterLabel}
        </Button>
      ))}
    </Stack>
  );
};

export default PostsSideBar;
