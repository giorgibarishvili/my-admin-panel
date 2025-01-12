import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import UserTable from "./pages/UserTable";

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <UserTable /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
