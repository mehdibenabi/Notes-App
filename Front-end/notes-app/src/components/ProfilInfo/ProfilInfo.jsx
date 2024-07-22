import React from 'react'
import {getInitials} from '../../utils/getInitials'
import './profilInfo.css'
import { useNavigate } from 'react-router-dom'

const ProfilInfo = () => {

    const navigate = useNavigate();
    const handleClick = () =>{

        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <div className='profil-info-section'>
        <div className="abr-name">
       <p>
        {getInitials("John william")}
       </p>
        </div>

        <div className="section-logout-name">

        <h5 className="profil-name">
            William
        </h5>
        <button onClick={handleClick} className="btn-profil-logout">Logout</button>      

        </div>
    </div>
  )
}

export default ProfilInfo