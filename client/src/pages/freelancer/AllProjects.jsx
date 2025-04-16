import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/AllProjects.css';

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayprojects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:6001/fetch-projects')
      .then((response) => {
        setProjects(response.data);
        setDisplayProjects(response.data.reverse());

        response.data.map((project) => {
          project.skills.map((skill) => {
            if (!allSkills.includes(skill)) {
              allSkills.push(skill);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        fetchProjects();
      });
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter((size) => size !== value));
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects
          .filter((project) =>
            categoryFilter.every((skill) => project.skills.includes(skill))
          )
          .reverse()
      );
    } else {
      setDisplayProjects(projects.reverse());
    }
  }, [categoryFilter]);

  return (
    <>
      {projects ? (
        <div className="all-projects-page">
          <div className="project-filters">
            <h3>Filters</h3>
            <hr />
            <div className="filters">
              <h5>Skills</h5>
              {allSkills.length > 0 ? (
                <div className="filter-options">
                  {allSkills.map((skill) => (
                    <div className="form-check" key={skill}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={skill}
                        id={`checkbox-${skill}`}
                        onChange={handleCategoryCheckBox}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox-${skill}`}
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="projects-list">
            <h3>All Projects</h3>
            <hr />
            {displayprojects.map((project) => (
              <div
                className="listed-project"
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
              >
                <div className="listed-project-head">
                  <h3>{project.title}</h3>
                  <p>{String(project.postedDate).slice(0, 24)}</p>
                </div>

                <p>{project.description}</p>
                
                <div>
                   <h5 className="sections-heading">Skills Required</h5>
                        <div className="skill-list">{project.skills.map((skill) => (
                           <h6 key={skill} className="skill-badge">{skill}</h6>
                            ))}
                        </div> 
                </div>

                <h5 className="budget">
                <b style={{ color: '#2C3E50' }} >Budget - </b> &#8377; {project.budget}
                </h5>

                <div className="bids-data">
                  <p>(Avg bid) - <b style={{ color: '#27AE60' }} >
                    &#8377;{' '}
                    {project.bids.length > 0
                      ? project.bidAmounts.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue,
                          0
                        )
                      : 0}{' '}
                    </b>
                  </p>
                </div>

                <div className="bids-data">
                  <p><b style={{ color: '#ee4950' }} >Total Bids -{project.bids.length}  </b></p>
                </div> 

                <hr />
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AllProjects;
