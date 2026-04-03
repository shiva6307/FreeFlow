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