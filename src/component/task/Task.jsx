/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./task.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserList from "../userList/UserList";
import SubmissionsList from "../SubmissionsList/SubmissionList";
import SubmitTask from "../submitTask/SubmitTask";
import axios from "axios";

const options = {
  ADMIN: ["Reassign User", "Reopen Task", "Delete"],
  USER: ["Submit Task"],
};

const Task = ({ item }) => {
  const [taskImage, setTaskImage] = useState("");
  const [openUserList, setOpenUserList] = useState(false);
  const [openSubmissionsList, setOpenSubmissionsList] = useState(false);
  const [openSubmitTask, setOpenSubmitTask] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData.user["custom:role"];

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchRandomImage = async () => {
      const res = await fetch("https://picsum.photos/200/300");
      setTaskImage(res.url);
    };

    fetchRandomImage();
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = async (option) => {
    handleMenuClose();
    switch (option) {
      case "Reassign User":
        setOpenUserList(true);
        break;
      case "Reopen Task":
        try {
          await axios.post(
            `${BASE_URL}/tasks/reopen`,
            {
              taskId: item.id,
            },
            {
              headers: { Authorization: `${jwt}` },
            }
          );
          alert("Task Reopened successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
        break;
      case "Delete":
        try {
          await axios.delete(`${BASE_URL}/tasks/${item.id}`, {
            headers: { Authorization: `${jwt}` },
          });
          alert("Task deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
        break;
      case "Submit Task":
        setOpenSubmitTask(true);
        break;
      default:
        break;
    }
  };

  const menuItems = options[role] || [];

  return (
    <div className="task">
      <div className="container">
        <div className="left">
          <div className="l">
            <img src={taskImage || item.image} alt="task" />
          </div>
          <div className="r">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(item.deadline).toLocaleString()}
            </p>
            <p>
              <strong>Assigned User:</strong>{" "}
              {item.assignedUserId || "Unassigned"}
            </p>
            <p>
              <strong>Assigned UserName:</strong>{" "}
              {item.assignedUserName || "Unassigned"}
            </p>
            <p>
              <strong>User Comment:</strong> {item.userComment || "None"}
            </p>
            <p>
              <strong>CompletedAt:</strong>{" "}
              {item.completedAt
                ? new Date(item.completedAt).toLocaleString()
                : "Not completed"}
            </p>
          </div>
        </div>
        <div className="right">
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              style: { maxHeight: 48 * 4.5, width: "20ch" },
            }}
          >
            {menuItems.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleMenuItemClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <UserList
        open={openUserList}
        handleClose={() => setOpenUserList(false)}
        taskId={item.id}
      />
      <SubmissionsList
        open={openSubmissionsList}
        handleClose={() => setOpenSubmissionsList(false)}
        taskId={item.id}
      />
      <SubmitTask
        open={openSubmitTask}
        handleClose={() => setOpenSubmitTask(false)}
        taskId={item.id}
      />
    </div>
  );
};

export default Task;
