/* eslint-disable react/prop-types */
import { useState } from "react";
import "./assignedTask.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "../userList/UserList";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SubmuissionsList from "../SubmissionsList/SubmissionList";
import axios from "axios";
import SubmitTask from "../submitTask/SubmitTask";

const options = {
  ADMIN: ["Assign User", "See Submissions", "Edit", "Delete"],
  USER: ["Submit Task"],
};

const DoneTask = ({ item }) => {
  const [openUserList, setOpenUserList] = useState(false);
  const [openSubmissionsList, setOpenSubmissionsList] = useState(false);
  const [openSubmitTask, setOpenSubmitTask] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  const user = JSON.parse(localStorage.getItem("userData")).user;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleClose();
  };

  const handleSeeSubmissions = () => {
    setOpenSubmissionsList(true);
    handleClose();
  };

  const handleOpenSubmitTask = () => {
    setOpenSubmitTask(true);
    handleClose();
  };

  const handleEdit = () => {
    // Logic for editing the task
    console.log("Edit Task");
    handleClose();
  };

  const handleDelete = async () => {
    // Logic for deleting the task
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/task/delete/" + item.id,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      res.data && alert("Task deleted successfully");
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const menuItems = user.role === "ADMIN" ? options.ADMIN : options.USER;

  const handleMenuItemClick = (option) => {
    switch (option) {
      case "Assign User":
        handleOpenUserList();
        break;
      case "See Submissions":
        handleSeeSubmissions();
        break;
      case "Edit":
        handleEdit();
        break;
      case "Delete":
        handleDelete();
        break;
      case "Submit Task":
        handleOpenSubmitTask();
        break;
      default:
        break;
    }
  };

  return (
    <div className="task">
      <div className="container">
        <div className="left">
          <div className="l">
            <img src={item.image} alt="" />
          </div>
          <div className="r">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
        <div className="right">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
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
      <SubmuissionsList
        taskId={item.id}
        open={openSubmissionsList}
        handleClose={() => setOpenSubmissionsList(false)}
      />
      <SubmitTask
        taskId={item.id}
        open={openSubmitTask}
        handleClose={() => setOpenSubmitTask(false)}
      />
    </div>
  );
};

export default DoneTask;
