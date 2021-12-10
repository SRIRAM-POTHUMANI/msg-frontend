import React, { useState } from "react";
import "./Login.css";
import axios from './axios';
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function Register() {
  //register user
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const addUser = async () => {
    try {
      await axios.post("/users/saveuser", {
        name: name,
        phone: phone,
        email: email,
        password: password,
      });
    } 
    catch (err) {
      console.warn(err);
    }
  };
  // const classes = useStyles();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="container login_container">
      <h1>Register</h1>
      <hr/>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          id="standard-required"
          label="Name"
          defaultValue={name}
          onChange={(event) =>
            setname(event.target.value)
          }
        />
      </div>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          id="standard-required"
          label="Phone"
          defaultValue={phone}
          onChange={(event) =>
            setphone(event.target.value)
          }
        />
      </div>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          required
          id="standard-required"
          label="E-mail"
          defaultValue={email}
          onChange={(event) =>
            setemail(event.target.value)
          }
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
          onChange={(event) =>
            setpassword(event.target.value)
          }
        />
      </div>
      <div className="row loginButton">
      <hr/>
      <Link to="/">
      <Button variant="outlined" color="primary" onClick={addUser}>
        Register
      </Button>
      </Link>
      </div>
    </div>
  );
}

export default Register;
