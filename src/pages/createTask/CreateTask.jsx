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
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState(null);
  const navigate = useNavigate();

  const jwt = "dgdhdshshs";

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUsers(res.data); // Assuming the API returns an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [jwt]);

  const handleUserChange = (event, value) => {
    setAssignedUser(value);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title,
      description,
      dueDate,
      assignedTo: assignedUser?.id,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/task/create",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      res.data && alert("Task created successfully");
      res.data && navigate("/tasks");
      setLoading(false);
    } catch (error) {
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
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          ></textarea>

          <Grid item xs={12} sx={{ width: "100%", marginBottom: "1rem" }}>
            <Autocomplete
              id="assign-user"
              options={users}
              getOptionLabel={(option) => option.name}
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
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
