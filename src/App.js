import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Chat from './Chat'
import Login from './Login.js'
import Register from "./Register";
function App() {
  return (
    <Router>
      <div className="container-sm">
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/reg">
            <Register />
            </Route>
          <Route path="/chat">
            <Chat />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}


export default App;