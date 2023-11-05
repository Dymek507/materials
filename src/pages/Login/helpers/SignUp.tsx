import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { FormControlLabel, Checkbox, Grid, Box, Avatar, Button, CssBaseline, TextField, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { app, db } from "../../../../firebase";
import { uiActions } from "../../../store/ui-slice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        FutDraft
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignUp() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const uId = useAppSelector((state) => state.ui.userData.uId);
  console.log(uId);

  const [formValid, setFormValid] = useState(false);

  const checkboxValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValid(e.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);

    //Create new user with email and password
    if (data.get('email') && data.get('password') === null) return

    createUserWithEmailAndPassword(
      auth,
      data.get("email")!.toString(),
      data.get("password")!.toString(),
    )
      .then((userCredential) => {
        //Make document for new user
        const newUser = doc(db, `users/${userCredential.user.uid}`);

        setDoc(newUser, {
          login: data.get("login")!.toString(),
          email: userCredential.user.email,
        });
        dispatch(
          uiActions.login({
            logged: true,
            userData: {
              login: data.get("login")!.toString(),
              uId: userCredential.user.uid,
            },
          }
          )
        );
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      backgroundColor: "white",
    }}>
      <CssBaseline />
      <Box
        sx={{
          margin: 1,
          paddingTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: "60px",
            height: "60px",
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zarejestruj się !
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="login"
                name="login"
                required
                fullWidth
                id="login"
                label="Login"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxValidity}
                    value="newPassword"
                    color="primary"
                  />
                }
                label="I used a password not used on other sites. Connection not secure.."
              />
            </Grid>
          </Grid>
          <Button
            disabled={!formValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register !
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/account/login"}>Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5, pb: 2 }} />
    </Container>
  );
}
