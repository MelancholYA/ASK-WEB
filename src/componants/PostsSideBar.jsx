import { Button, Stack, Typography } from "@mui/material";
import React from "react";

export const filters = ["General", "Tech", "Romance", "Babies"];

const PostsSideBar = ({ filter, setFilter }) => {
  const handleClick = (filterLabel) => {
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
      <Typography variant="h6" sx={{ mb: 1 }}>
        Filters :{" "}
      </Typography>
      <Button
        key={"all"}
        variant={!filter ? "contained" : "outlined"}
        onClick={() => handleClick(null)}
      >
        All
      </Button>
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
