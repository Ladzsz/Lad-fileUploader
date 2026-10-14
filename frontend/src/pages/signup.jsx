import { useState } from "react";
import "../assets/formStyles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const Navigate = useNavigate();

  //setting form variables and states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  //handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //password match error
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    //api call to create user
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("User created!");
      Navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  //rendering form
  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="signup-form">
        {/*form inputs*/}
        <div className="form-input-container">
          <div className="form-heading">
            <label htmlFor="content">Username:</label>

            <p>({formData.username.length} / 24)</p>
          </div>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            maxLength="24"
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/*button*/}
        <button type="submit" className="form-btn">
          Submit
        </button>

        {/*login link*/}
        <Link to="/login" className="forgot-pass-link">
          <li className="forgot-pass-link">go to login</li>
        </Link>
      </form>
    </div>
  );
}

export default Signup;