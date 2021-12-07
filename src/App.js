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
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/reg" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;