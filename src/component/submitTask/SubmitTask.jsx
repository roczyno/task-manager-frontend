/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";
import "./submitTask.scss";
import { useNavigate } from "react-router-dom";

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

export default function SubmitTask({ handleClose, open, taskId }) {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL}/tasks/status`,
        {
          taskId,
          status: "COMPLETED",
          comment,
        },
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      alert("Submitted successfully");
      navigate("/tasks");
      window.location.reload();
    } catch (error) {
      console.error("Axios error:", error);
      alert("Failed to submit task");
    } finally {
      setLoading(false);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <form onSubmit={handleSubmitTask}>
            <input
              type="text"
              placeholder="Any Comment?"
              onChange={(e) => setComment(e.target.value)}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </button>
            </Box>
          </form>
        </div>
      </Box>
    </Modal>
  );
}
