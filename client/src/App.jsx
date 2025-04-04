import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import User from "./pages/users"
import Admin from "./pages/admin"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
