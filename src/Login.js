import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link1 from "@material-ui/core/Link";
import axios from "./axios";

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
  //login
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const loginuser = async () => {
    try {
      var response = await axios.post("/users/login", {
        email: email,
        password: password,
      });

      if (response.data) {
        localStorage.setItem("token", response.data);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="container login_container">
      <h1>Sign-in</h1>
      <hr />
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          required
          id="standard-required"
          label="E-mail"
          defaultValue={email}
          onChange={(event) => setemail(event.target.value)}
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
          onChange={(event) => setpassword(event.target.value)}
        />
      </div>
      <div className="row loginButton loginBut">
        <Link to="/chat">
          <Button className="loginBut" variant="outlined" onClick={loginuser}>
            Login
          </Button>
        </Link>
      </div>
      <div className="row">
        <Link1 component="button" variant="body2" href="/forgotpw">
          Forgot Password
        </Link1>
      </div>
      <hr />
      <div className="row regButton">
        <Link to="/reg">
          <Button variant="outlined">Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
