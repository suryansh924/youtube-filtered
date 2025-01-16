// src/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user data after successful login
  useEffect(() => {
    fetch("http://localhost:3001/api/current_user", {
      method: "GET",
      credentials: "include", // Send cookies (session) with the request
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log("Error fetching user:", err));
  }, []);

  // If user data isn't loaded yet, display loading message
  if (!user) {
    return <p>Loading...</p>;
  }

  // Display user profile information
  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      {/* <img src={user.imageUrl} alt="User Avatar" /> */}
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
