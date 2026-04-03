import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin/admin.css'
import axios from 'axios';
import { API_URL } from '../../config.js';

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`${API_URL}/fetch-projects`)
      .then((response) => {
        setProjectsCount(response.data.length);
        const comPros = response.data.filter((pro) => pro.status === 'Completed');
        setCompletedProsCount(comPros.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApplications = async () => {
    await axios
      .get(`${API_URL}/fetch-applications`)
      .then((response) => {
        setApplicationsCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get(`${API_URL}/fetch-users`)
      .then((response) => {
        setUsersCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-cards01">
        <div className="dashboard-card01">
          <h4>All Projects</h4>
          <p>{projectsCount}</p>
          <button onClick={() => navigate('/admin-projects')}>View Projects</button>
        </div>
        <div className="dashboard-card01">
          <h4>Completed Projects</h4>
          <p>{completedProsCount}</p>
          <button onClick={() => navigate('/admin-projects')}>View Projects</button>
        </div>
        <div className="dashboard-card01">
          <h4>Applications</h4>
          <p>{applicationsCount}</p>
          <button onClick={() => navigate('/admin-applications')}>View Applications</button>
        </div>
        <div className="dashboard-card01">
          <h4>Users</h4>
          <p>{usersCount}</p>
          <button onClick={() => navigate('/all-users')}>View Users</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
