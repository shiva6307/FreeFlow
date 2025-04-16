import React, { useEffect, useState } from 'react';
import '../../styles/freelancer/freelancer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Freelancer = () => {
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const navigate = useNavigate();
  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    fetchUserData(localStorage.getItem('userId'));
    fetchApplications();
  }, []);

  const fetchUserData = async (id) => {
    axios.get(`http://localhost:6001/fetch-freelancer/${id}`).then((response) => {
      setFreelancerData(response.data);
      if (response.data) {
        setFreelancerId(response.data._id);
        setSkills(response.data.skills);
        setDescription(response.data.description);
        setUpdateSkills(response.data.skills);
        setUpdateDescription(response.data.description);
      }
    });
  };

  const updateUserData = async () => {
    axios
      .post('http://localhost:6001/update-freelancer', {
        freelancerId,
        updateSkills: updateSkills,
        description: updateDescription,
      })
      .then(() => {
        fetchUserData();
        alert('User data updated');
      });
  };

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:6001/fetch-applications')
      .then((response) => {
        setApplicationsCount(
          response.data.filter(
            (application) => application.freelancerId === localStorage.getItem('userId')
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {freelancerData && (
        <div className="freelancer-home">
          {/* Dashboard Cards */}
          <div className="dashboard-cards">
            {[
              {
                title: 'Current Projects',
                count: freelancerData.currentProjects.length,
                buttonText: 'View Projects',
                onClick: () => navigate('/my-projects', { state: { filter: 'In Progress' } }),
              },
              {
                title: 'Completed Projects',
                count: freelancerData.completedProjects.length,
                buttonText: 'View Projects',
                onClick: () => navigate('/my-projects', { state: { filter: 'Completed' } }),
              },
              {
                title: 'Applications',
                count: applicationsCount.length,
                buttonText: 'View Applications',
                onClick: () => navigate('/myApplications'),
              },
              {
                title: 'Funds',
                count: `Available: ₹${freelancerData.funds}`,
                buttonText: null,
              },
            ].map(({ title, count, buttonText, onClick }, index) => (
              <div className="dashboard-card" key={index}>
                <h4>{title}</h4>
                <p>{count}</p>
                {buttonText && (
                  <button className="primary-btn" onClick={onClick}>
                    {buttonText}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Freelancer Details */}
          <div className="freelancer-details">
            {!isDataUpdateOpen ? (
              <div className="freelancer-details-view">
                <div className="details-section">
                  <h4>My Skills</h4>
                  <div className="skills-container">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <span className="skill-chip" key={skill}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>No skills available</p>
                    )}
                  </div>
                </div>
                <div className="details-section">
                  <h4>Description</h4>
                  <p>{description || 'Please add your description'}</p>
                </div>
                <button
                  className="primary-btn"
                  onClick={() => setIsDataUpdateOpen(true)}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="freelancer-details-edit">
                <div className="form-group">
                  <label htmlFor="mySkills">My Skills</label>
                  <input
                    type="text"
                    id="mySkills"
                    placeholder="Enter skills"
                    value={updateSkills}
                    onChange={(e) => setUpdateSkills(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description-textarea">Description</label>
                  <textarea
                    id="description-textarea"
                    placeholder="Enter your description"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  ></textarea>
                </div>
                <button className="primary-btn" onClick={updateUserData}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Freelancer;
