import React from "react";
import "./Login.css";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function Register() {
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
          defaultValue=""
        />
      </div>
      <div className="row">
        <TextField
          style={{ minWidth: "60%" }}
          id="standard-required"
          label="Phone"
          defaultValue=""
        />
      </div>
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
      <hr/>
      <Button variant="outlined" color="primary" href="/" onClick={handleToggle}>
        Register
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Button variant="contained" href="/">Register</Button> */}
      </div>
    </div>
  );
}

export default Register;
