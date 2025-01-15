import "./allUsers.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://iiq610r2b5.execute-api.eu-west-1.amazonaws.com/Prod/users",
          {
            headers: {
              Authorization: `${jwt}`,
            },
          }
        );
        console.log(res.data);

        if (res.data?.isSuccessful) {
          // Map the API response to extract necessary fields
          const userList = res.data.users.map((user) => ({
            userId: user.attributes["custom:userId"],
            email: user.attributes["email"],
            role: user.attributes["custom:role"],
            createdAt: user.userCreateDate, // Assuming `createdAt` is part of attributes
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
  }, [jwt]);

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
                <th>Role</th>
                <th>User ID</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.email}</td>
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
