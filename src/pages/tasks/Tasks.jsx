import "./tasks.scss";
import Task from "../../component/task/Task";
import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  // const jwt = JSON.parse(localStorage.getItem("userData")).jwt;
  // const role = JSON.parse(localStorage.getItem("userData")).user.role;
  const jwt = "gsgsg";
  const role = "USER";

  const [data, setData] = useState([
    {
      id: "1",
      name: "Complete Project Proposal",
      description: "Prepare the project proposal for the new client.",
      assignedUserId: "7d3a3dbc-880c-430b-8a7e-954dc91b6b95",
      deadline: "2025-02-01T12:00:00",
    },
    {
      id: "2",
      name: "Update Website Content",
      description: "Update the homepage with new content and images.",
      assignedUserId: "d97f1edb-0407-4ff2-9f36-c71ef063b395",
      deadline: "2025-02-05T17:00:00",
    },
    {
      id: "3",
      name: "Design Marketing Brochure",
      description: "Create a brochure to market the new product line.",
      assignedUserId: "fcdb7d29-e69f-4fe2-a1f2-c9f63a9a25b4",
      deadline: "2025-02-10T09:00:00",
    },
    {
      id: "4",
      name: "Conduct User Testing",
      description: "Test the usability of the new app with selected users.",
      assignedUserId: "bc7a3b34-b902-4a0c-bfea-d2a69c755b16",
      deadline: "2025-02-15T14:00:00",
    },
    {
      id: "5",
      name: "Write Monthly Report",
      description: "Compile the monthly performance report for the department.",
      assignedUserId: "b02f4c8a-9d4a-42b9-bfd2-91d63632b14b",
      deadline: "2025-02-20T18:00:00",
    },
  ]);

  // useEffect(() => {
  //   const getAllTasks = async () => {
  //     try {
  //       let res;
  //       if (role === "ADMIN") {
  //         res = await axios.get("http://localhost:5000/api/task/all", {
  //           headers: {
  //             Authorization: `Bearer ${jwt}`,
  //           },
  //         });
  //       } else if (role === "USER") {
  //         res = await axios.get("http://localhost:5000/api/task/user", {
  //           headers: {
  //             Authorization: `Bearer ${jwt}`,
  //           },
  //         });
  //       }

  //       setData(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAllTasks();
  // }, [jwt, role]);

  return (
    <div className="tasks">
      {data.map((item) => (
        <Task item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tasks;
