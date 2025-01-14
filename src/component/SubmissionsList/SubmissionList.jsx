/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function SubmissionsList({ handleClose, open, taskId }) {
  // const jwt = JSON.parse(localStorage.getItem("userData")).jwt;

  const jwt = "sghsgks";
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(null); // Track loading state for each submission

  useEffect(() => {
    const getAllSubmissions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/submissions/all/task/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setSubmissions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSubmissions();
  }, [jwt, taskId]);

  const handleAcceptOrDecline = async (id, status) => {
    setLoading(id);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/submissions/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(null);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(null);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-titleAccess"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {submissions <= 0 ? (
            <span> No submissions yet</span>
          ) : (
            submissions.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github Link
                  </a>
                  <a
                    href={item.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Deployed Url
                  </a>
                  <span>Submission time: {item.submissionTime}</span>
                  <span>Username: {item.username}</span>
                  <div>
                    <CheckIcon
                      titleAccess="accept"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAcceptOrDecline(item.id, "accept")}
                    />
                    <ClearIcon
                      titleAccess="decline"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAcceptOrDecline(item.id, "rejected")}
                    />
                    {loading === item.id && <CircularProgress size={24} />}
                  </div>
                </div>
              </div>
            ))
          )}
        </Box>
      </Modal>
    </div>
  );
}
