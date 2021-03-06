import React from "react";
import clsx from "clsx";
import Pusher from "pusher-js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Chatbody from "./Chatbody";
import "./Chat.css";

// import Pusher from "pusher-js";
import { useEffect, useState, useRef } from "react";
import axios from "./axios";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
const decoded = jwt_decode(token);

const existingUser = decoded.existUser.name;

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Chat() {
  //messages
  const [username, setUsername] = useState("");
  const [recievername, setrecievername] = useState("");
  useEffect(() => {
    setUsername(existingUser);
    setrecievername(prompt("Please enter to name"));
  }, []);
  var pusher = new Pusher("7b837337ccb8aebc6007", {
    cluster: "ap2",
  });

  const [messages, setMessages] = useState([]);
  const [userList, setuserList] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sync = async () => {
    await axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  };
  const userlist = async () => {
    await axios.get("/users/userlist").then((res) => {
      setuserList(res.data);
    });
  };
  // useEffect(() => {
  //   userlist();
  //   sync();
  //   scrollToBottom();
  // });
  // ()=>{
  // sync();
  // userlist();

  // }
  // pusher
  useEffect(() => {
    const channel = pusher.subscribe("mern-msg");
    channel.bind("inserted", function (newMessage) {
      sync();
      userlist();
    });

    return () => {
      channel.unbind_all();
    };
  }, [messages]);

  //drawers
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log(userlist);
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Avatar />
          <h2>Sender name</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List>
          {userList.map((users) => (
            <ListItem button key={users._id}>
              <ListItemIcon>
                <Avatar className={classes.small}></Avatar>
              </ListItemIcon>
              <ListItemText primary={users.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main>
        <div className="chat fixed-bottom">
          <Chatbody messages={messages} name={username} toName={recievername} />
          {scrollToBottom()}
        </div>
      </main>
    </div>
  );
}
