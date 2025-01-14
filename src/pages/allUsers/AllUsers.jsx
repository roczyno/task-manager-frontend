import "./allUsers.scss";

const AllUsers = () => {
  const dummyUsers = [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "ADMIN",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "USER",
    },
    {
      id: 3,
      email: "bob.jones@example.com",
      firstName: "Bob",
      lastName: "Jones",
      role: "USER",
    },
    {
      id: 4,
      email: "alice.williams@example.com",
      firstName: "Alice",
      lastName: "Williams",
      role: "ADMIN",
    },
  ];

  return (
    <div className="all-users">
      <div className="main-container">
        <h1>All Users</h1>
        {dummyUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
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
