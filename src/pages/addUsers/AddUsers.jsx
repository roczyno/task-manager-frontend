import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import "./addUsers.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const jwt = "dgdhdshshs";

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      role,
      firstName,
      lastName,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/add",
        userData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      res.data && alert("User added successfully");
      res.data && navigate("/users");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="add-users">
      <div className="main-container">
        <h1>Add User</h1>
        <form onSubmit={handleAddUser}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </TextField>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Add User"}
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
