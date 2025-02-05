import "./tasks.scss";
import Task from "../../component/task/Task";
import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData.user["custom:role"];

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = userData.user["custom:userId"];

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          res = await axios.get(`${BASE_URL}/tasks`, {
            headers: {
              Authorization: `${jwt}`,
            },
          });
          console.log(res.data.tasks);
          setData(res.data.tasks);
        } else if (role === "USER") {
          res = await axios.get(`${BASE_URL}/tasks/user/${userId}`, {
            headers: {
              Authorization: `${jwt}`,
            },
          });
          console.log(res.data);
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };

    getAllTasks();
  }, [jwt, role, userId, BASE_URL]);

  return (
    <div className="tasks">
      {data?.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tasks;
