import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import User from "./pages/users"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
