import { TextField, Grid, Container, Button, Typography } from "@mui/material";

import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";

import { useFetch } from "../../hooks/useFetch";
import { useStorage } from "../../hooks/useStorage";
import { UserContext } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { postData, isLoading, data, clearData } = useFetch();
  const { saveStorageData } = useStorage();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { password: "", email: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
    }),
    onSubmit: (values) => {
      postData({ path: "users/login", payload: values });
    },
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
      saveStorageData({ key: "askUserData", data });

      navigate({ pathname: "/" });
    }
    return () => {
      clearData();
    };
  }, [data]);

  return (
    <Container sx={{ p: 2 }} align="center">
      <Typography variant="h3" sx={{ mb: 3 }}>
        Welcome Back
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="email"
              name="email"
              value={values.email}
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="password"
              name="password"
              type="password"
              value={values.password}
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "SUBMITING..." : "SUBMIT"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
