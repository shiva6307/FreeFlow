import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/allUsers.css";
import { API_URL } from "../../config.js";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    await axios
      .get(`${API_URL}/fetch-users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="all-users-page">
      {/* Header Card for the All Users Title */}
      <div className="header-card">
        <h3>All Users</h3>
      </div>

      {/* User Cards */}
      <div className="all-users">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="user-info">
              <span>
                <b>User Id</b>
                <p>{user._id}</p>
              </span>
              <span>
                <b>Username</b>
                <p>{user.username}</p>
              </span>
              <span>
                <b>Email</b>
                <p>{user.email}</p>
              </span>
              <span>
                <b>User Role</b>
                <p>{user.usertype}</p>
              </span>
            </div>
            <button className="view-user-btn" onClick={() => navigate(`/user/${user._id}`)}>
              View User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
