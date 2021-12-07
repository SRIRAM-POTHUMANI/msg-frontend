import React from "react";
import "./Login.css";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function Login() {
  const classes = useStyles();

  return (
    <div className="container login_container">
      <h1>Sign-in</h1>
      <hr/>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          required
          id="standard-required"
          label="Username"
          defaultValue=""
        />
      </div>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <div className="row loginButton">
        <Button variant="contained" href="/chat">
          Login
        </Button>
      </div>
      <div className="row">
        <Link
          component="button"
          variant="body2"
          href="/forgotpw"
        >
          Forgot Password
        </Link>
      </div>
      <hr/>
      <div className="row regButton">
        <Button variant="outlined" href="/reg">
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
