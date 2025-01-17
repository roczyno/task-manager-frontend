import "./allUsers.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        console.log(res.data);

        if (res.data?.isSuccessful) {
          // Map the API response to extract necessary fields
          const userList = res.data.users.map((user) => ({
            userId: user.attributes["custom:userId"],
            email: user.attributes["email"],
            role: user.attributes["custom:role"],
            username: user.attributes["name"],
            createdAt: user.userCreateDate,
          }));
          setUsers(userList);
        } else {
          console.error("Failed to fetch users: ", res.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [jwt, BASE_URL]);

  return (
    <div className="all-users">
      <div className="main-container">
        <h1>All Users</h1>
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>User ID</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.userId}</td>
                  <td>{user.createdAt}</td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
