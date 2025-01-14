/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UserList({ handleClose, open, taskId }) {
  // const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  const jwt = "sjgl";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null); // Track loading state for each user

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    getAllUsers();
  }, [jwt, taskId]);

  const handleAssignUser = async (userId) => {
    setLoading(userId); // Set loading to the user ID being assigned
    try {
      await axios.post(
        `http://localhost:5000/api/task/assign/${taskId}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      alert("User assigned successfully");
      setLoading(null);
    } catch (error) {
      alert("Failed to assign user");
      setLoading(null);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar src="https://plus.unsplash.com/premium_photo-1688385848467-781c5394c017?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </ListItemAvatar>
              <ListItemText primary={user.username} />
            </ListItem>
            <Button
              sx={{ color: "green" }}
              onClick={() => handleAssignUser(user.id)}
              disabled={loading === user.id} // Disable button if this user is being assigned
            >
              {loading === user.id ? <CircularProgress size={24} /> : "Select"}
            </Button>
          </div>
        ))}
      </Box>
    </Modal>
  );
}
