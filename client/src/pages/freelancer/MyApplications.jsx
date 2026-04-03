import React, { useEffect, useState } from "react";
import "../../styles/freelancer/MyApplications.css";
import axios from "axios";
import { API_URL } from "../../config.js";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios
      .get(`${API_URL}/fetch-applications`)
      .then((response) => {
        setApplications(response.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="my-applications-container">
      <div className="main-card">
        <div className="applications-header">
          <h2 className="applications-title">My Applications</h2>
        </div>

        <div className="applications-list">
          {applications
            .filter(
              (application) =>
                application.freelancerId === localStorage.getItem("userId")
            )
            .map((application) => (
              <div className="application-card" key={application._id}>
                <div className="application-content">
                  <div className="application-section">
                    <h4 className="application-title">{application.title}</h4>
                    <div className="light-divider"></div>
                    <p className="application-description">
                      {application.description}
                    </p>
                    <div>
                      <h5 className="section-heading">Skills Required</h5>
                      <div className="skills-list">
                        {application.requiredSkills.map((skill) => (
                          <span key={skill} className="skill-badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="application-budget">
                       <strong>Client name : </strong> 
                    <span className="budget-value"> {application.clientName}</span>
                  </p>
                    <p className="application-budget">
                      <strong>Budget:</strong>{" "}
                      <span className="budget-value">
                        &#8377; {application.budget}
                      </span>
                    </p>
                  </div>

                  <div className="vertical-divider"></div>

                  <div className="application-section">
                    <div>
                      <h5 className="section-heading">Your Proposal</h5>
                      <div className="light-divider"></div>
                      <p className="application-proposal">
                        {application.proposal}
                      </p>
                    </div>
                    <div>
                      <h5 className="section-heading">Your Skills</h5>
                      <div className="skills-list">
                        {application.freelancerSkills.map((skill) => (
                          <span key={skill} className="skill-badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="application-budget">
                      <strong>Proposed Budget:</strong>{" "}
                      <span className="budget-value">
                        &#8377; {application.bidAmount}
                      </span>
                    </p>
                    <p className="application-status">
                      <strong>Status:</strong>{" "}
                      <span className="status-value">{application.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
