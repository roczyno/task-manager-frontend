import { Navbar } from "../../component/navbar/Navbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Task from "../../component/task/Task";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="container">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
