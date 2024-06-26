import "./login.scss";

import { Link, useNavigate } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { eye } from "react-icons-kit/icomoon/eye";
import { useState } from "react";

import axios from "axios";

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
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userData", JSON.stringify(res.data));
      res.data && navigate("/tasks");
    } catch (error) {
      console.log(error);
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
