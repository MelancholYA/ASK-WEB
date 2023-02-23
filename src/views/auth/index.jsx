import { Grid, Paper, Container, Typography, Button } from "@mui/material";

import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { userData } = useContext(UserContext);

  return userData ? (
    <Navigate to="/" replace />
  ) : (
    <Container>
      <Container align="center">
        <Typography variant="h1" sx={{ fontWeight: 800, marginTop: 25 }}>
          ASK
        </Typography>
        <Typography align="center" variant="subtitle1">
          Ask Questions and Make Friends on the way
        </Typography>
        <Grid
          container
          space={2}
          className={`authToggleContainer ${isLogin ? "" : "moveRight"}`}
        >
          <Grid item xs={6}>
            <button
              onClick={() => setIsLogin(true)}
              className={`authToggleContainer_button ${
                isLogin ? "_active" : ""
              }`}
            >
              LOGIN
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={() => setIsLogin(false)}
              className={`authToggleContainer_button ${
                isLogin ? "" : "_active"
              }`}
            >
              REGISTER
            </button>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          overflow: "hidden",
          p: 0,
          width: "100%",
          background: "#00000023",
          borderRadius: "5px",
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            flexWrap: "nowrap",
            transform: `translateX(-${isLogin ? "0" : "100"}%)`,
            transition: `1000ms cubic-bezier(0.45,-0.16, 0.52, 1.22)`,
          }}
        >
          <Grid item xs={12} sx={{ flexShrink: 0 }}>
            <Login />
          </Grid>
          <Grid item xs={12} sx={{ flexShrink: 0 }}>
            <Register />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Index;
