# Freelancing App

This README contains the source code for the Freelancing App project, including frontend, backend, and database code. The code is organized by directory and file for easy reference in the project report.

## Frontend Code

### client/package.json
```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/material": "^5.16.7",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.4",
    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.4",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-router-dom": "^6.26.1",
    "react-scripts": "5.0.1",
    "socket.io-client": "^4.7.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### client/src/App.js
```javascript
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';


import Authenticate from './pages/Authenticate';

import Freelancer from './pages/freelancer/Freelancer'
import AllProjects from './pages/freelancer/AllProjects'
import MyProjects from './pages/freelancer/MyProjects'
import MyApplications from './pages/freelancer/MyApplications'
import ProjectData from './pages/freelancer/ProjectData'


import Client from './pages/client/Client'
import ProjectApplications from './pages/client/ProjectApplications'
import NewProject from './pages/client/NewProject'
import ProjectWorking from './pages/client/ProjectWorking'

import Admin from './pages/admin/Admin'
import AdminProjects from './pages/admin/AdminProjects'
import AllApplications from './pages/admin/AllApplications'
import AllUsers from './pages/admin/AllUsers'


function App() {
  return (
    <div className="App">

      <Navbar />
     
     <Routes>

        <Route exact path='/' element={<Landing />} />
        
        <Route path='/authenticate' element={<Authenticate />} />

        <Route path='/freelancer' element={<Freelancer />} />
        <Route path='/all-projects' element={<AllProjects />} />
        <Route path='/my-projects' element={<MyProjects />} /> 
        <Route path='/myApplications' element={<MyApplications />} />
        <Route path='/project/:id' element={<ProjectData />} />


        <Route path='/client' element={<Client />} />
        <Route path='/project-applications' element={<ProjectApplications />} />
        <Route path='/new-project' element={<NewProject />} />
        <Route path='/client-project/:id' element={<ProjectWorking />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin-projects' element={<AdminProjects />} />
        <Route path='/admin-applications' element={<AllApplications />} />
        <Route path='/all-users' element={<AllUsers />} />


     </Routes>
    </div>
  );
}

export default App;
```

### client/src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import GeneralContextProvider from './context/GeneralContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <GeneralContextProvider>
              <App />
        </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### client/src/config.js
```javascript
// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:6001';
const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:6001';

export { API_URL, WS_URL };
```

### client/src/context/GeneralContext.jsx
```jsx
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socketIoClient from 'socket.io-client';
import { API_URL, WS_URL } from '../config.js';

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const socket = socketIoClient(WS_URL);


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
 
  
  
  
  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post(`${API_URL}/login`, loginInputs)
        .then( async (res)=>{

          localStorage.setItem('userId', res.data._id);
            localStorage.setItem('usertype', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'freelancer'){
                navigate('/freelancer');
            } else if(res.data.usertype === 'client'){
              navigate('/client');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }
          }).catch((err) =>{
            alert("login failed!!");
            console.log(err);
          });
          
        }catch(err){
          console.log(err);
        }
      }
      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
        await axios.post(`${API_URL}/register`, inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('usertype', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);

            if(res.data.usertype === 'freelancer'){
              navigate('/freelancer');
          } else if(res.data.usertype === 'client'){
            navigate('/client');
          } else if(res.data.usertype === 'admin'){
              navigate('/admin');
          }
 
        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{socket, login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider
```

### client/src/components/Login.jsx
```jsx
import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <form className="authForm">
      <h2>Login</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>
        Sign in
      </button>
      <p>
        Not registered?{' '}
        <button
          type="button"
          className="auth-link"
          onClick={() => setAuthType('register')}
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default Login;
```

### client/src/components/Navbar.jsx
```jsx
import React, { useContext, useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import logo from '../images/srmcem_head_logo-BN0LEybD.png'; // ✅ Import logo image

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const usertype = localStorage.getItem("usertype");
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const renderNavOptions = () => {
    if (usertype === "freelancer") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/freelancer"); }}>Dashboard</button>
          <button onClick={() => { closeMenu(); navigate("/all-projects"); }}>All Projects</button>
          <button onClick={() => { closeMenu(); navigate("/my-projects"); }}>My Projects</button>
          <button onClick={() => { closeMenu(); navigate("/myApplications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    } else if (usertype === "client") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/client"); }}>Dashboard</button>
          <button onClick={() => { closeMenu(); navigate("/new-project"); }}>New Project</button>
          <button onClick={() => { closeMenu(); navigate("/project-applications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    } else if (usertype === "admin") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/admin"); }}>Home</button>
          <button onClick={() => { closeMenu(); navigate("/all-users"); }}>All Users</button>
          <button onClick={() => { closeMenu(); navigate("/admin-projects"); }}>Projects</button>
          <button onClick={() => { closeMenu(); navigate("/admin-applications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="navbar">
      <div className="logo-container">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h3 class="navbar-title">FreeFlow-freelancing platform</h3>
              </div>
      <div className={`nav-options ${menuOpen ? "active" : ""}`}>
        {renderNavOptions()}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Navbar;
```

### client/src/components/Register.jsx
```jsx
import React, { useContext } from 'react'

import { GeneralContext } from '../context/GeneralContext';

const Register = ({setAuthType}) => {


  const {setUsername, setEmail, setPassword, setUsertype, register} = useContext(GeneralContext);

  const handleRegister = async (e) =>{
    e.preventDefault();
    await register();
  }

  return (
    <form className="authForm">
    <h2>Register</h2>
    <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="floatingInput" placeholder="username"
                                                   onChange={(e)=> setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
    </div>
    <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
                                                   onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                                   onChange={(e)=> setPassword(e.target.value)} /> 
        <label htmlFor="floatingPassword">Password</label>
    </div>
    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                                                  onChange={(e)=> setUsertype(e.target.value)}>
      <option value="">User type</option>
      <option value="freelancer">Freelancer</option>
      <option value="client">Client</option>
      <option value="admin">Admin</option>
    </select>

    <button className="btn btn-primary" onClick={handleRegister}>Sign up</button>
    <p>Already registered? <button type="button"
          className="auth-link1" onClick={()=> setAuthType('login')}>Login</button></p>
</form>
  )
}

export default Register
```

### client/src/pages/Authenticate.jsx
```jsx
import React, { useState } from 'react'
import '../styles/authenticate.css'
import Login from '../components/Login'
import Register from '../components/Register'
import {useNavigate} from 'react-router-dom'
import logo from '../images/srmcem_head_logo-BN0LEybD.png'; // ✅ Import logo image

const Authenticate = () => {

  const [authType, setAuthType] = useState('login');

  const navigate = useNavigate();

  return (


    <div className="AuthenticatePage">

        <div className="auth-navbar">
          <div className="logo-container">
                          <img src={logo} alt="Logo" className="navbar-logo" />
                          <h3 class="navbar-title">FreeFlow-freelancing platform</h3>
                        </div>
          <button onClick={()=> navigate('/')} >Home</button>
        </div>

        {authType==='login' ?
        <>
            <Login setAuthType={setAuthType} />
        </>
        :
        <>
            <Register setAuthType={setAuthType} />
        </>
        }

    </div>
  )
}

export default Authenticate
```

### client/src/pages/Landing.jsx
```jsx
import React, { useEffect } from 'react';
import '../styles/landing.css';

import { useNavigate } from 'react-router-dom';
import logo from '../images/srmcem_head_logo-BN0LEybD.png'; // ✅ Import logo image

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('usertype') === 'freelancer') {
      navigate('/freelancer');
    } else if (localStorage.getItem('usertype') === 'client') {
      navigate('/client');
    } else if (localStorage.getItem('usertype') === 'admin') {
      navigate('/admin');
    }
  });

  return (
    <div className="landing-page">
      {/* Navbar */}
      <div className="landing-nav">
      <div className="logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h3 class="navbar-title">FreeFlow-freelancing platform</h3>
        </div>
        <div className="auth-buttons">
          {/*<button onClick={() => navigate('/authenticate')}>Sign Up</button>*/}
          <button onClick={() => navigate('/authenticate')}>Login</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="landing-hero">
        <div className="landing-hero-card">
          <div className="landing-hero-text">
            <h1>Find the perfect freelance services</h1>
            <p>
              Connect with top talent from around the world. Post a job or find
              work that matches your skills. Start your freelancing journey today.
            </p>
            <button onClick={() => navigate('/authenticate')}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
```

### client/src/pages/freelancer/Freelancer.jsx
```jsx
import React, { useEffect, useState } from 'react';
import '../../styles/freelancer/freelancer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config.js';

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
    axios.get(`${API_URL}/fetch-freelancer/${id}`).then((response) => {
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
      .post(`${API_URL}/update-freelancer`, {
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
      .get(`${API_URL}/fetch-applications`)
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
```

### client/src/pages/freelancer/AllProjects.jsx
```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/AllProjects.css';
import { API_URL } from '../../config.js';

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
      .get(`${API_URL}/fetch-projects`)
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
```

### client/src/pages/client/Client.jsx
```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/client/client.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';

const Client = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`${API_URL}/fetch-projects`)
      .then((response) => {
        let pros = response.data.filter(
          (pro) => pro.clientId === localStorage.getItem('userId')
        );
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      })
      .catch((err) => {
        console.log(err);
        fetchProjects();
      });
  };

  const [filterProject, setFilterProject] = useState('');

  const handleFilterChange = (data) => {
    if (data === '') {
      setDisplayProjects(projects);
    } else if (data === 'Un Assigned') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Available').reverse()
      );
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
            <option value="Un Assigned">Un Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr />

        {displayProjects.map((project) => (
          <div
            className="listed-project"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
          >
            <div className="listed-project-head">
              <h3>{project.title}</h3>
              <p>{String(project.postedDate).slice(0, 25)}</p>
            </div>
            <h5 className="project-budget">
              Budget - <span>&#8377; {project.budget}</span>
            </h5>
            <p>{project.description}</p>

            <div className="bids-data">
              <h6 className="project-status">
                Status - <span>{project.status}</span>
              </h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
```

### client/src/pages/client/NewProject.jsx
```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';
import { API_URL } from '../../config.js';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post(`${API_URL}/new-project`, {
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
```

### client/src/pages/admin/Admin.jsx
```jsx
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
```

## Backend Code

### server/index.js
```javascript
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Application, Chat, Freelancer, Project, User } from './Schema.js';
import { Server } from 'socket.io';
import http from 'http';
import SocketHandler from './SocketHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL] 
    : ['http://localhost:3000', '*'];

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

io.on("connection", (socket) =>{
    console.log("User connected");

    SocketHandler(socket);
})


const PORT = process.env.PORT || 6001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Freelancing';

mongoose.connect(MONGODB_URI, {
    // useNewUrlParser: true,  // Deprecated in MongoDB driver 4.0+
    // useUnifiedTopology: true  // Deprecated in MongoDB driver 4.0+
}).then(()=>{


    app.post('/register', async (req, res) =>{
        try{
    
            const {username, email, password, usertype} = req.body;
    
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
    
            const newUser = new User({
                username, 
                email,
                password: passwordHash,
                usertype
            });

            const user = await newUser.save();
            
            if(usertype === 'freelancer'){
                const newFreelancer = new Freelancer({
                    userId: user._id
                })
                await newFreelancer.save();
            }
    
            res.status(200).json(user);
    
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    app.post('/login', async (req, res) =>{
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email:email});
            if(!user) return res.status(400).json({msg: "User does not exist"});
    
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
                 
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });

    app.get('/fetch-freelancer/:id', async(req, res)=>{
        try{

            const freelancer = await Freelancer.findOne({userId: req.params.id});

            res.status(200).json(freelancer);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    app.post('/update-freelancer', async(req, res)=>{
        const {freelancerId, updateSkills, description} = req.body;
        try{

            const freelancer = await Freelancer.findById(freelancerId);

            let skills = updateSkills.split(',');

            freelancer.skills = skills;
            freelancer.description = description;

            await freelancer.save();

            res.status(200).json(freelancer);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    // fetch project

    app.get('/fetch-project/:id', async(req, res)=>{
        try{

            const project = await Project.findById( req.params.id);

            res.status(200).json(project);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    // fetch all projects
    app.get('/fetch-projects', async(req, res)=>{
        try{

            const projects = await Project.find();

            res.status(200).json(projects);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    app.post('/new-project', async(req, res)=>{
        const {title, description, budget, skills, clientId,  clientName,  clientEmail} = req.body;
        try{

            const projectSkills = skills.split(',');
            const newProject = new Project({
                title,
                description,
                budget, 
                skills: projectSkills, 
                clientId,  
                clientName, 
                clientEmail,
                postedDate: new Date()
            })
            await newProject.save();
            res.status(200).json({message: "Project added"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    // make bid

    app.post('/make-bid', async(req, res)=>{
        const {clientId, freelancerId, projectId, proposal, bidAmount, estimatedTime} = req.body;
        try{

            const freelancer = await User.findById(freelancerId);
            const freelancerData = await Freelancer.findOne({userId: freelancerId});
            const project = await Project.findById(projectId);
            const client = await User.findById(clientId);

            const newApplication = new Application({
                projectId,
                clientId,
                clientName: client.username,
                clientEmail: client.email,
                freelancerId,
                freelancerName: freelancer.username,
                freelancerEmail: freelancer.email,
                freelancerSkills: freelancerData.skills,
                title: project.title,
                description: project.description,
                budget: project.budget,
                requiredSkills: project.skills,
                proposal,
                bidAmount,
                estimatedTime
            })

            const application = await newApplication.save();

            project.bids.push(freelancerId);
            project.bidAmounts.push(parseInt(bidAmount));

            console.log(application);

            if(application){

                freelancerData.applications.push(application._id)
            }

            await freelancerData.save();
            await project.save();


            res.status(200).json({message: "bidding successful"});
        }catch(err){
            console.log(err)
            res.status(500).json({error: err.message});
        }
    })


    // fetch all applications
    app.get('/fetch-applications', async(req, res)=>{
        try{

            const applications = await Application.find();

            res.status(200).json(applications);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    // approve application
    app.get('/approve-application/:id', async(req, res)=>{
        try{

            const application = await Application.findById(req.params.id);

            const project = await Project.findById(application.projectId);

            const freelancer = await Freelancer.findOne({userId: application.freelancerId});

            const user = await User.findById(application.freelancerId);

            application.status = 'Accepted';

            await application.save();

            const remainingApplications = await Application.find({projectId: application.projectId, status: "Pending"});

            remainingApplications.map(async (appli)=>{
                appli.status === 'Rejected';
                await appli.save();
            })

            project.freelancerId = freelancer.userId;
            project.freelancerName = user.email;
            project.budget = application.bidAmount;

            project.status = "Assigned";

            freelancer.currentProjects.push(project._id);

            await project.save();
            await freelancer.save();


            res.status(200).json({message: "Application approved!!"});

        }catch(err){
            console.log(err);
            res.status(500).json({error: err.message});
        }
    })

    // reject application
    app.get('/reject-application/:id', async(req, res)=>{
        try{

            const application = await Application.findById(req.params.id);

           

            application.status = 'Rejected';

            await application.save();



            res.status(200).json({message: "Application rejected!!"});

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    // submit project
    app.post('/submit-project', async(req, res)=>{
        const {clientId, freelancerId, projectId, projectLink, manualLink, submissionDescription} = req.body;
        try{

            const project = await Project.findById(projectId);

            project.projectLink = projectLink;
            project.manulaLink = manualLink;
            project.submissionDescription = submissionDescription;
            project.submission = true;

            await project.save();

            await project.save();
            res.status(200).json({message: "Project added"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    // approve submission
    app.get('/approve-submission/:id', async(req, res)=>{
        try{

            const project = await Project.findById(req.params.id);
            const freelancer = await Freelancer.findOne({userId: project.freelancerId});

            project.submissionAccepted = true;
            project.status = "Completed";

            freelancer.currentProjects.pop(project._id);
            freelancer.completedProjects.push(project._id);

            freelancer.funds = parseInt(freelancer.funds) + parseInt(project.budget);

            await project.save();
            await freelancer.save();

            res.status(200).json({message: "submission approved"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    // reject submission
    app.get('/reject-submission/:id', async(req, res)=>{
        try{

            const project = await Project.findById(req.params.id);

            project.submission =  false;
            project.projectLink =  "";
            project.manulaLink =  "";
            project.submissionDescription =  "";

            await project.save();

            res.status(200).json({message: "submission approved"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    // fetch all users
    app.get('/fetch-users', async(req, res)=>{
        try{

            const users = await User.find();

            res.status(200).json(users);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    // fetch chats
    app.get('/fetch-chats/:id', async(req, res)=>{
        try{

            const chats = await Chat.findById(req.params.id);

            console.log(chats);

            res.status(200).json(chats);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    server.listen(PORT, ()=>{
        console.log(`Running @ ${PORT}`);
    });
}).catch((e)=> console.log(`Error in db connection ${e}`));
```

### server/SocketHandler.js
```javascript
import { Chat, Project } from "./Schema.js";
import {v4 as uuid} from 'uuid';

const SocketHandler = (socket) =>{

    socket.on("join-chat-room", async({projectId, freelancerId})=>{
        const project = await Project.findById(projectId);

        if(project.freelancerId === freelancerId){

          await socket.join(projectId);
  
          console.log(socket.rooms);
          
  
          socket.broadcast.to(projectId).emit("user-joined-room");
          
          const chats = await Chat.findById(projectId);
  
          if(!chats){
              const newChat = new Chat({
                  _id: projectId,
                  messages: []
              })
  
              await newChat.save();
          }
  
          await socket.emit('messages-updated', {chats});
        }
    })


    socket.on("join-chat-room-client", async({projectId})=>{
      const project = await Project.findById(projectId);

      if(project.status === "Assigned" || project.status === "Completed"){

        await socket.join(projectId);

        console.log(socket.rooms);
        

        socket.broadcast.to(projectId).emit("user-joined-room");
        
        const chats = await Chat.findById(projectId);

        if(!chats){
            const newChat = new Chat({
                _id: projectId,
                messages: []
            })

            await newChat.save();
        }

        await socket.emit('messages-updated', {chats});
      }
  })

    socket.on('update-messages', async ({ projectId }) => {
        try {
          const chat = await Chat.findOne({ projectId});
          console.log('updating messages');
          socket.emit('messages-updated', { chat });
        } catch (error) {
          console.error('Error updating messages:', error);
        }
    });


    socket.on('new-message', async ({ projectId, senderId, message, time}) => {
        try {
          await Chat.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { messages: { id: uuid(), text: message, senderId, time } } },
            { new: true }
          );
      
          const chat = await Chat.findOne({ _id: projectId });
          console.log(chat);
          socket.emit('messages-updated', { chat });
          socket.broadcast.to(projectId).emit('message-from-user');
        } catch (error) {
          console.error('Error adding new message:', error);
        }
      });



}

export default SocketHandler;
```

## Database Code

### server/Schema.js
```javascript
import mongoose, { Schema, mongo } from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    usertype:{
        type: String,
        require: true
    }
})

const freelancerSchema = mongoose.Schema({
    userId: String,
    skills: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    currentProjects: {
        type: Array,
        default: []
    },
    completedProjects: {
        type: Array,
        default: []
    },
    applications: {
        type: Array,
        default: []
    },
    funds: {
        type: Number,
        default: 0
    },
})


const projectSchema = mongoose.Schema({
    clientId: String,
    clientName: String,
    clientEmail: String,
    title: String,
    description: String,
    budget: Number,
    skills: Array,
    bids: Array,
    bidAmounts: Array,
    postedDate: String,
    status: {
        type: String,
        default: "Available"
    },
    freelancerId: String,
    freelancerName: String,
    deadline: String,
    submission: {
        type: Boolean,
        default: false
    },
    submissionAccepted: {
        type: Boolean,
        default: false
    },
    projectLink: {
        type: String,
        default: ""
    },
    manulaLink: {
        type: String,
        default: ""
    },
    submissionDescription: {
        type: String,
        default: ""
    },
})


const applicationSchema = mongoose.Schema({

    projectId: String,
    clientId: String,
    clientName: String,
    clientEmail: String,
    freelancerId: String,
    freelancerName: String,
    freelancerEmail: String,
    freelancerSkills: Array,
    title: String,
    description: String,
    budget: Number,
    requiredSkills: Array,
    proposal: String,
    bidAmount: Number,
    estimatedTime: Number,
    status: {
        type: String,
        default: "Pending"
    }
})

const chatSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    messages: {
        type: Array
    }
})

export const User = mongoose.model('users', userSchema);
export const Freelancer = mongoose.model('freelancer', freelancerSchema);
export const Project = mongoose.model('projects', projectSchema);
export const Application = mongoose.model('applications', applicationSchema);
export const Chat = mongoose.model('chats', chatSchema);
```

Note: The full source code for all files is available in the project repository. This README includes the key files for reference in the project report.