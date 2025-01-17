/* eslint-disable react/prop-types */
import "./sidebar.scss";
import { Link } from "react-router-dom";

const menu = [
  { name: "Create Task", value: "", role: ["ADMIN"], path: "/create-task" },
  { name: "All Tasks", value: "", role: ["ADMIN", "USER"], path: "/tasks" },
  { name: "Add Users", value: "", role: ["ADMIN"], path: "/add-users" },
  { name: "All Users", value: "", role: ["ADMIN"], path: "/users" }, // New menu item
];

const userData = JSON.parse(localStorage.getItem("userData"));
const role = userData?.user["custom:role"];

const Sidebar = ({ menuOpen }) => {
  // Modify the menu dynamically based on role
  const updatedMenu = menu.map((item) => {
    if (item.name === "All Tasks" && role === "USER") {
      return { ...item, name: "My Assigned Tasks" };
    }
    return item;
  });

  return (
    <div className={menuOpen ? "sidebar active" : "sidebar"}>
      <div className="sidebar-container">
        {updatedMenu
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
