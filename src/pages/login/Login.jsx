import "./login.scss";

import { Link, useNavigate } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { eye } from "react-icons-kit/icomoon/eye";
import { useState } from "react";

const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeBlocked);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(eye);
    } else {
      setType("password");
      setIcon(eyeBlocked);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://iiq610r2b5.execute-api.eu-west-1.amazonaws.com/Prod/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Parse the response as JSON
      const data = await response.json();

      

      // Store the user data in localStorage
      localStorage.setItem("userData", JSON.stringify(data));

      // Navigate to another route on success
      data && navigate("/tasks");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <div className="reg_container">
        <div className="wrapper">
          <h1>Login</h1>
          <p>
            Solve real-world challenges and earn money.
            <br />
            It all starts with creating an account with us. <br />
            or{" "}
            <Link style={{ color: "#277bcd" }} to="/register">
              sign up
            </Link>{" "}
            to your account
          </p>
          <div className="form_container">
            <form onSubmit={handleLogin}>
              <span className="icon" onClick={handlePasswordToggle}>
                <Icon icon={icon} size={20} />
              </span>
              <label>Email Address</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
              <label>Password</label>
              <input
                type={type}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="other">
                <div className="left">
                  <input type="checkbox" className="checkbox" />
                  <span>Remember me</span>
                </div>
                <span style={{ color: "#277bcd" }}>Forgot your password?</span>
              </div>

              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
