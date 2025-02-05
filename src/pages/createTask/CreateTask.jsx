import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import "./createTask.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // Changed dueDate to match backend field name
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState(null);
  const navigate = useNavigate();

  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });

        if (res.data?.isSuccessful) {
          const userList = res.data.users.map((user) => ({
            id: user.attributes["custom:userId"],
            email: user.attributes["email"],
            name: user.attributes["name"],
          }));
          setUsers(userList);
        } else {
          console.error("Failed to fetch users: ", res.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [jwt, BASE_URL]);

  const handleUserChange = (event, value) => {
    setAssignedUser(value);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      name: title,
      description,
      assignedUserId: assignedUser?.id,
      assignedUserName: assignedUser?.name,
      deadline,
    };

    try {
      const res = await axios.post(`${BASE_URL}/tasks`, taskData, {
        headers: {
          Authorization: `${jwt}`,
        },
      });
      console.log(res);
      res.data && alert("Task created successfully");
      res.data && navigate("/tasks");
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="create-task">
      <div className="main-container">
        <h1>Create Task</h1>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            cols="30"
            rows="10"
            placeholder="Responsibility"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          ></textarea>

          <Grid item xs={12} sx={{ width: "100%", marginBottom: "1rem" }}>
            <Autocomplete
              id="assign-user"
              options={users}
              getOptionLabel={(option) => option.email} // Display email only
              onChange={handleUserChange}
              renderInput={(params) => (
                <TextField
                  label="Assign User"
                  fullWidth
                  placeholder="Select a user"
                  {...params}
                />
              )}
            />
          </Grid>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)} // Capture both date and time
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Create"}
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
