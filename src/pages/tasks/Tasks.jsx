import "./tasks.scss";
import Task from "../../component/task/Task";
import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData.user["custom:role"]; // Corrected role access

  // For "USER" role, we need to get the user's ID.
  const userId = userData.user["custom:userId"]; // Assuming userId is stored in localStorage

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          // ADMIN fetches all tasks
          res = await axios.get(
            "https://iiq610r2b5.execute-api.eu-west-1.amazonaws.com/Prod/tasks",
            {
              headers: {
                Authorization: `${jwt}`,
              },
            }
          );
          console.log(res);
        } else if (role === "USER") {
          // USER fetches only their specific tasks
          res = await axios.get(
            `https://iiq610r2b5.execute-api.eu-west-1.amazonaws.com/Prod/tasks/${userId}`,
            {
              headers: {
                Authorization: `${jwt}`,
              },
            }
          );
        }

        if (res?.data) {
          setData(res.data.tasks); // Set the data fetched from the API
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllTasks();
  }, [jwt, role, userId]); // Added userId dependency for fetching tasks when userId changes

  return (
    <div className="tasks">
      {data.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tasks;
