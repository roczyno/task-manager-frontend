/* eslint-disable react/prop-types */

import "./main.scss";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <div className="content">
        <h1>Manage Your Amalitech Team's Daily Task</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          reader content of a page when looking at it's layout
        </p>
        <div className="button">
          <Link to="/register" className="link">
            <button className="left">Get Started</button>
          </Link>
          <button className="right">30 Days free trial</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
