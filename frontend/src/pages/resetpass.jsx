import { useState } from "react";
import "../assets/formStyles.css";
import { useNavigate, useParams } from "react-router-dom";

export function Resetpass() {
  //setting form variables and states
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [sending, setsending] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  //handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsending(true);

    //password match error
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setsending(false);
      return;
    }
    setError("");

    // try block for password reset
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/confirm-reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: formData.password }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to reset password");
      }

      alert("Password has been reset.");
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
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="signup-form">
        {/*form inputs*/}
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
          {sending ? "resetting" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Resetpass;
