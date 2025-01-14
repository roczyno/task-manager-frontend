/* eslint-disable react/prop-types */
import "./sidebar.scss";
import { Link } from "react-router-dom";

const menu = [
  { name: "Create Task", value: "", role: ["ADMIN"], path: "/create-task" },
  { name: "DONE", value: "done", role: ["ADMIN", "USER"], path: "/done" },
  { name: "All Tasks", value: "", role: ["ADMIN", "USER"], path: "/tasks" },
  { name: "ASSIGNED", value: "assigned", role: ["ADMIN"], path: "/assigned" },
  { name: "Add Users", value: "", role: ["ADMIN"], path: "/add-users" },
  { name: "All Users", value: "", role: ["ADMIN"], path: "/users" }, // New menu item
];

const userData = JSON.parse(localStorage.getItem("userData"));
const role = "ADMIN";
const Sidebar = ({ menuOpen }) => {
  return (
    <div className={menuOpen ? "sidebar active" : "sidebar"}>
      <div className="sidebar-container">
        {menu
          .filter((item) => item.role.includes(role))
          .map((item, index) => (
            <Link key={index} to={item.path} className="link">
              <span>{item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
