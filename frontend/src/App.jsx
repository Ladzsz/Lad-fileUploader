import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Homepage from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useState, useEffect } from "react";
import Forgotpass from "./pages/forgotpass";
import Resetpass from "./pages/resetpass";
import "./App.css";

function Layout() {
  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  //setting login to true from the backend
  useEffect(() => {
    fetch("http://localhost:3000/api/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setloggedin(true);
        setUser(data.user);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {location.pathname !== "/login" ||
        (location.pathname !== "/signup" && <Header />)}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Homepage loggedin={loggedin} />} />
        <Route
          path="/login"
          element={
            <Login setloggedin={setloggedin} setUser={setUser} user={user} />
          }
        />
        <Route path="/forgot-password" element={<Forgotpass />} />
        <Route path="/reset-password/:token" element={<Resetpass />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;
