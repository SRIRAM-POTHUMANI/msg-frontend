import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Chat from './Chat'
import Login from './Login.js'
import Register from "./Register";
function App() {
  return (
    <Router>
      <div className="container-sm">
        <switch>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          </switch>
      </div>
    </Router>
  );
}


export default App;