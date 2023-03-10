import { TextField, Grid, Container, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/userContext";
import { useFetch } from "../../hooks/useFetch";
import { useStorage } from "../../hooks/useStorage";

const Register = () => {
  const { clearData, postData, data, isLoading } = useFetch();
  const { saveStorageData } = useStorage();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: { password: "", email: "", firstName: "", lastName: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is required"),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    onSubmit: (values) => {
      postData({ path: "users/new", payload: values });
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
  });

  return (
    <Container sx={{ p: 2 }} align="center">
      <Typography variant="h3">Welcome Aboard</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="First Name"
              name="firstName"
              value={values.firstName}
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              variant="outlined"
              onChange={handleChange}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
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
              type="password"
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

export default Register;
