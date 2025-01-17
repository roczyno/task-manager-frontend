import "./tasks.scss";
import Task from "../../component/task/Task";
import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData.user["custom:role"];
  // Corrected role access
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // For "USER" role, we need to get the user's ID.
  const userId = userData.user["custom:userId"]; // Assuming userId is stored in localStorage

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          // ADMIN fetches all tasks
          res = await axios.get(`${BASE_URL}/tasks`, {
            headers: {
              Authorization: `${jwt}`,
            },
          });
          console.log(res.data.tasks);
          setData(res.data.tasks);
        } else if (role === "USER") {
          // USER fetches only their specific tasks
          res = await axios.get(`${BASE_URL}/tasks/user/${userId}`, {
            headers: {
              Authorization: `${jwt}`,
            },
          });
          console.log(res.data);
          setData(res.data);
        }

        // if (res?.data) {
        //   setData(res.data.tasks); // Set the data fetched from the API
        // }
      } catch (error) {
        console.log(error);
      }
    };

    getAllTasks();
  }, [jwt, role, userId, BASE_URL]); // Added userId dependency for fetching tasks when userId changes

  return (
    <div className="tasks">
      {data?.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tasks;
