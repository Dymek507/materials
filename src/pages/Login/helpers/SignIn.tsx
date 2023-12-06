import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormControlLabel, Checkbox, Grid, Box, Avatar, Button, CssBaseline, TextField, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { logIn } from "../../../store/ui-actions"
import { useAppDispatch } from "../../../store/app/hooks";

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        FutDraft
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') && data.get('password') === null) return

    signInWithEmailAndPassword(auth, data.get("email")!.toString(), data.get("password")!.toString())
      .then((userCredential) => {
        const userUid = userCredential.user.uid;
        dispatch(logIn(userUid));
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const clickHandler = () => {
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      backgroundColor: "white",
    }}>
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 4,
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
          Zaloguj się!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ZALOGUJ
          </Button>
          <Grid container>
            <Grid item xs>
              <Button variant="outlined" onClick={clickHandler}>
                Rejestracja
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, pb: 4 }} />
    </Container>

  );
}
