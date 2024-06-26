import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
// import { Icon } from "react-icons-kit";
// import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
// import { eye } from "react-icons-kit/icomoon/eye";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";

const options = [
  "Select your specialization",
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Mobile Developer",
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [specialization, setSpecialization] = useState("");
  // const [type, setType] = useState("password");
  // const [icon, setIcon] = useState(eyeBlocked);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSpecialization(options[index]); // Update specialization state
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handlePasswordToggle = () => {
  //   if (type === "password") {
  //     setType("text");
  //     setIcon(eye);
  //   } else {
  //     setType("password");
  //     setIcon(eyeBlocked);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
        specialization,
      });
      res.data && navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="reg_container">
        <div className="wrapper">
          <h1>Welcome to Contribute</h1>
          <p>
            Solve real-world challenges with Us and earn money.
            <br />
            It all starts with creating an account with us. <br />
            or{" "}
            <Link style={{ color: "#277BCD" }} to="/login">
              sign in
            </Link>{" "}
            to your account
          </p>
          <div className="form_container">
            <form onSubmit={handleRegister}>
              <label>Full name</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Email Address</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Select your specialization</label>
              <div>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{
                    bgcolor: "background.paper",
                    border: "1px solid lightgray",
                  }}
                >
                  <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                  >
                    <ListItemText secondary={options[selectedIndex]} />
                  </ListItemButton>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div className="tc">
                <input type="checkbox" className="checkbox" />
                <span>
                  I agree to the Contribute
                  <Link style={{ color: "#277BCD" }}>
                    {" "}
                    terms and conditions
                  </Link>{" "}
                  and the{" "}
                  <Link style={{ color: "#277BCD" }}>privacy policy</Link>
                </span>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
