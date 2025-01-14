/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import "./submitTask.scss";

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
  // const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  const jwt = "sgsgg";
  const [githubLink, setGithubLink] = useState("");
  const [deployedUrlLink, setDeployedUrlLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/submissions/submit?taskId=${taskId}&githubLink=${githubLink}&deployedUrl=${deployedUrlLink}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
      alert("Submitted successfully");
      setLoading(false);
      setDeployedUrlLink("");
      setGithubLink("");
    } catch (error) {
      console.error("Fetch error:", error);
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
              placeholder="Github link here"
              onChange={(e) => setGithubLink(e.target.value)}
            />
            <input
              type="text"
              placeholder="Deployed url link here"
              onChange={(e) => setDeployedUrlLink(e.target.value)}
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
