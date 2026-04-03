import React, { useEffect, useState } from 'react';
import '../../styles/admin/allApplications.css';
import axios from 'axios';
import { API_URL } from '../../config.js';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios.get(`${API_URL}/fetch-applications`)
      .then((response) => {
        setApplications(response.data.reverse());
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user-applications-page">
      {/* Header Card */}
      <div className="applications-card">
        <div className="applications-header-card">
          <h3>All Applications</h3>
        </div>

        {/* Applications List */}
        <div className="applications-list">
          {applications.map((application) => (
            <div className="application-card" key={application._id}>
              <div className="application-details">
                {/* Left Section: Client & Project Details */}
                <div className="application-section">
                  <h4 className="application-title">{application.title}</h4>
                  <p className="application-description">{application.description}</p>
                  <div className="application-skills-section">
                    <h5 className="section-heading">Required Skills</h5>
                    <div className="skills-list">
                      {application.requiredSkills.map((skill) => (
                        <p key={skill} className="skill-badge">{skill}</p>
                      ))}
                    </div>
                  </div>
                  <h5>
                    Budget: 
                    <span className="budget-value">&#8377; {application.budget}</span>
                  </h5>
                  <h5>
                    Client: 
                    <span className="info-value"> {application.clientName}</span>
                  </h5>
                  <h5>
                    Client Id: 
                    <span className="info-value"> {application.clientId}</span>
                  </h5>
                  <h5>
                    Client Email: 
                    <span className="info-value"> {application.clientEmail}</span>
                  </h5>
                </div>

                {/* Divider between left and right sections */}
                <div className="application-divider"></div>

                {/* Right Section: Proposal & Freelancer Details */}
                <div className="application-section">
                  <div className="application-proposal">
                    <h5 className="section-heading">Proposal</h5>
                    <p className="proposal-text">{application.proposal}</p>
                  </div>
                  <div className="application-skills-section">
                    <h5 className="section-heading"> Freelancer Skills</h5>
                    <div className="skills-list">
                      {application.freelancerSkills.map((skill) => (
                        <p key={skill} className="skill-badge">{skill}</p>
                      ))}
                    </div>
                  </div>
                  <h5>
                    Proposed Budget: 
                    <span className="budget-value">&#8377; {application.bidAmount}</span>
                  </h5>
                  <h5>
                    Freelancer: 
                    <span className="info-value"> {application.freelancerName}</span>
                  </h5>
                  <h5>
                    Freelancer Id: 
                    <span className="info-value"> {application.freelancerId}</span>
                  </h5>
                  <h5>
                    Freelancer Email:
                    <span className="info-value"> {application.freelancerEmail}</span>
                  </h5>
                  <h5>
                    Status: 
                    <span className="status-value" style={application.status==="Accepted" ? { color: '#E67E22'} : {}}>
                       {application.status}
                    </span>
                  </h5>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApplications;
