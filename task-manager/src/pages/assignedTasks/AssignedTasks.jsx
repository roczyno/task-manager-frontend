import "./assignedTasks.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import AssignedTask from "../../component/assignedTask/AssignedTask";

const AssignedTasks = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  const role = JSON.parse(localStorage.getItem("userData")).user.role;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          res = await axios.get(
            "http://localhost:5000/api/task/all?taskStatus=ASSIGNED",
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
        } else if (role === "USER") {
          res = await axios.get(
            "http://localhost:5000/api/task/user?taskStatus=ASSIGNED",
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
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
        <AssignedTask item={item} key={item.id} />
      ))}
    </div>
  );
};

export default AssignedTasks;
