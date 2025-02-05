import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.scss";

import CreateTask from "./pages/createTask/CreateTask";
import { Navbar } from "./component/navbar/Navbar";
import Tasks from "./pages/tasks/Tasks";
import DoneTasks from "./pages/doneTasks/DoneTasks";
import AssignedTasks from "./pages/assignedTasks/AssignedTasks";
import AddUsers from "./pages/addUsers/AddUsers";
import AllUsers from "./pages/allUsers/AllUsers";

const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/create-task",
          element: <CreateTask />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/done",
          element: <DoneTasks />,
        },
        {
          path: "/assigned",
          element: <AssignedTasks />,
        },
        {
          path: "/add-users",
          element: <AddUsers />,
        },
        {
          path: "/users",
          element: <AllUsers />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
