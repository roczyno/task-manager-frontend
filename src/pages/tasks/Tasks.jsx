import "./tasks.scss";
import Task from "../../component/task/Task";
import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  const role = JSON.parse(localStorage.getItem("userData")).user.role;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          res = await axios.get("http://localhost:5000/api/task/all", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
        } else if (role === "USER") {
          res = await axios.get("http://localhost:5000/api/task/user", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
        }

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTasks();
  }, [jwt, role]);

  return (
    <div className="tasks">
      {data.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tasks;
