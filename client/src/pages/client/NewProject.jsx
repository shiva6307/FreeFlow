import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:6001/new-project', {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email'),
      })
      .then(() => {
        alert('New project added!');
        setTitle('');
        setDescription('');
        setBudget(0);
        setSkills('');
        navigate('/client');
      })
      .catch(() => {
        alert('Operation failed!');
      });
  };

  return (
    <div className="new-project-page">
      <div className="new-project-container">
        <h3>Post New Project</h3>
        <div className="new-project-form">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Project Title</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="form-row">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                placeholder="Budget (₹)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <label>Budget (₹)</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Required Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <label>Required Skills (separate by commas)</label>
            </div>
          </div>
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
