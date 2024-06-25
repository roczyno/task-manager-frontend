import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import "./createTask.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const tags = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Reactjs",
  "Nodejs",
  "SpringBoot",
];

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const jwt = JSON.parse(localStorage.getItem("userData")).jwt;

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title,
      description,
      tags: selectedTags,
      dueDate,
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
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              overflow: "hidden",
              height: "70px",
            }}
          >
            <Autocomplete
              multiple
              id="multiple-limit-tags"
              options={tags}
              onChange={handleTagsChange}
              getOptionLabel={(option) => option}
              placeholder="Select to add tags"
              fullWidth
              size="large"
              sx={{ overflow: "hidden" }}
              renderInput={(params) => (
                <TextField label="Select Tags" fullWidth {...params} />
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
