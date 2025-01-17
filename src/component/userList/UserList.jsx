/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loading for fetching users
  const [assigning, setAssigning] = useState(null); // Track assigning state for specific user

  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${BASE_URL}/users`, {
            headers: {
              Authorization: `${jwt}`,
            },
          });

          if (res.data?.isSuccessful) {
            const userList = res.data.users.map((user) => ({
              userId: user.attributes["custom:userId"],
              email: user.attributes["email"],
              role: user.attributes["custom:role"],
              username: user.attributes["name"],
              createdAt: user.userCreateDate,
            }));
            setUsers(userList);
          } else {
            console.error("Failed to fetch users: ", res.data);
          }
        } catch (error) {
          console.error("Failed to fetch users", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [open, jwt, BASE_URL]);

  const handleReassignUser = async (userId) => {
    setAssigning(userId); // Set assigning state
    try {
      await axios.put(
        `${BASE_URL}/tasks/reassign`,
        {
          taskId,
          newAssigneeUserId: userId,
        },
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );
      alert("User assigned successfully");
      handleClose(); // Close modal after successful assignment
    } catch (error) {
      alert("Failed to assign user");
      console.error("Assignment Error:", error);
    } finally {
      setAssigning(null); // Clear assigning state
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
        <Typography variant="h6" component="h2" gutterBottom>
          Reassign User
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          users.map((user) => (
            <div
              key={user.userId}
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
                <ListItemText primary={user.username} secondary={user.email} />
              </ListItem>
              <Button
                sx={{ color: "green" }}
                onClick={() => handleReassignUser(user.userId)}
                disabled={assigning === user.userId} // Disable if this user is being assigned
              >
                {assigning === user.userId ? (
                  <CircularProgress size={24} />
                ) : (
                  "Select"
                )}
              </Button>
            </div>
          ))
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
