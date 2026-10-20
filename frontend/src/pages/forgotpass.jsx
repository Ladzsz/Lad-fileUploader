import { useState } from "react";
import "../assets/formStyles.css";
import { Link, useNavigate } from "react-router-dom";

export function Forgotpass() {
  //setting form variables and states
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [sending, setsending] = useState(false);
  const navigate = useNavigate();

  //handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsending(true);

    //api call to login user
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("failed to send reset email");
      }

      alert("password reset sent to email.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setsending(false);
    }
  };

  //rendering form
  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="signup-form">
        {/*form inputs*/}
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

        {/*button*/}
        <button type="submit" className="form-btn">
          {sending ? "Sending..." : "Submit"}
        </button>

        {/*forgot pass link*/}
        <Link to="/login">
          <li className="forgot-pass-link">Login?</li>
        </Link>
      </form>
    </div>
  );
}

export default Forgotpass;