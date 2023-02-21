import { TextField, Grid, Container, Button, Typography } from "@mui/material";

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

import { usePost } from "../../hooks/useFetch";

const Login = () => {
  const User = usePost({
    path: "users/login",
    query: "user",
    successMessage: "welcome",
  });

  const { data, isLoading, isError, isSuccess, error } = User.mutate;
  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: { password: "", email: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
    }),
    onSubmit: async (values) => {
      await User.mutate.mutateAsync(values);
    },
  });

  useEffect(() => {
    console.log({ data, isLoading, isError, isSuccess, error });
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
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "SUBMITING..." : "SUBMIT"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
