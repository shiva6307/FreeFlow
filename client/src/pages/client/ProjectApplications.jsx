import React, { useEffect, useState } from 'react';
import '../../styles/client/ClientApplications.css';
import axios from 'axios';

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  


  const fetchApplications = async () => {
    try {
      const response = await axios
      .get('http://localhost:6001/fetch-applications');
      const filteredApplications = response.data.filter(
        (application) => application.clientId === localStorage.getItem('userId')
      );
      setApplications(filteredApplications);
      setDisplayApplications(filteredApplications.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      const uniqueTitles = applications.reduce((titles, application) => {
        if (!titles.includes(application.title)) titles.push(application.title);
        return titles;
      }, []);
      setProjectTitles(uniqueTitles);
    }
  }, [applications]);

  const handleApprove = async (id) => {
    try {
      await axios.get(`http://localhost:6001/approve-application/${id}`);
      alert('Application approved');
      fetchApplications();
    } catch (err) {
      alert('Operation failed!!');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.get(`http://localhost:6001/reject-application/${id}`);
      alert('Application rejected!!');
      fetchApplications();
    } catch (err) {
      alert('Operation failed!!');
    }
  };

  const handleFilterChange = (value) => {
    if (value === '') {
      setDisplayApplications(applications.reverse());
    } else {
      setDisplayApplications(
        applications.filter((application) => application.title === value).reverse()
      );
    }
  };

  
  return (
    <div className="client-applications-container">
      <div className="applications-list-container">
        <div className="applications-header-card">
          <h3>Applications</h3>
          {projectTitles && (
            <select
              className="applications-filter"
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">All Projects</option>
              {projectTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="applications-list">
          {displayApplications.map((application) => (
            <div className="application-card" key={application._id}>
              <div className="application-details">
                <div className="application-section">
                  <h4>{application.title}</h4>
                  <p>{application.description}</p>
                  <div className="application-skills-section">
                    <h5>Required Skills</h5>
                    <div className="skills-list">
                      {application.requiredSkills.map((skill) => (
                        <p key={skill}>{skill}</p>
                      ))}
                    </div>
                  </div>
                  <h6>Budget - <b style={{ color: '#27ae60' }}>₹ {application.budget}</b></h6>
                </div>
                <div className="application-divider"></div>
                <div className="application-section">
                  <div className="application-proposal">
                    <h5>Proposal</h5>
                    <p>{application.proposal}</p>
                  </div>
                  <div className="application-skills-section">
                    <h5>Freelancer Skills</h5>
                    <div className="skills-list">
                      {application.freelancerSkills.map((skill) => (
                        <p key={skill}>{skill}</p>
                      ))}
                    </div>
                  </div>
                  <h6>
                    Freelancer name -  
                    <span className="info-value"> {application.freelancerName}</span>
                  </h6>
                  <h6>
                    Freelancer Email - 
                    <span className="info-value"> {application.freelancerEmail}</span>
                  </h6>
                  <h6>Proposed Budget - <b style={{ color: '#27ae60' }} >₹ {application.bidAmount}</b></h6>
                  <div className="application-actions">
                    {application.status === 'Pending' ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(application._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(application._id)}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <h6>
                        Status: <b style={{ color: '#3498db' }}>{application.status}</b>
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectApplications;
