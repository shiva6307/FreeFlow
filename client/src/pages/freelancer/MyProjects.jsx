import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/freelancer/MyProjects.css';
import { API_URL } from '../../config.js';

const MyProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (location.state?.filter) {
      handleFilterChange(location.state.filter);
    }
  }, [location.state]);

  const fetchProjects = async () => {
    await axios
      .get(`${API_URL}/fetch-projects`)
      .then((response) => {
        const pros = response.data.filter(
          (pro) => pro.freelancerId === localStorage.getItem('userId')
        );
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (data) => {
    if (data === '') {
      setDisplayProjects(projects.reverse());
    } else if (data === 'In Progress') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Assigned').reverse()
      );
    } else if (data === 'Completed') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Completed').reverse()
      );
    }
  };

  return (
    <div className="client-projects-page">
      <div className="client-projects-list">
        <div className="client-projects-header">
          <h3>My projects</h3>
          <select
            className="form-control"
            placeholder="Project status"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Choose project status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr />

        {displayProjects.map((project) => (
          <div
            className="listed-project"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="listed-project-head">
              <h3>{project.title}</h3>
              <p>{project.postedDate}</p>
            </div>
            <h5>Budget - <span>₹{project.budget}</span></h5>
            <p>{project.description}</p>
            <div className="bids-data">
              <h6 className="project-status1">Status - <span>{project.status} </span> </h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
