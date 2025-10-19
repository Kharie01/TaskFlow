import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'
import Arrowicon from '../../assets/arrowdown.svg'
import Profile from '../../assets/profile.svg'
import Search from '../../assets/search.svg'
import Dots from '../../assets/dots.svg'
import NPicon from '../../assets/notebook.svg'
import Sicon from '../../assets/settings.svg'
import Picon from '../../assets/PomIcon.svg'



function Sidebar() {
    const [userName, setUserName] = useState(localStorage.getItem('username') || 'User');
  return (
    <div className='Container' transition-style="in:wipe:right">
        <div className="leftbtn">
            <div className="profile">
                <img id='profile1' src={Profile} alt="" />
                <h6>{userName}</h6>
                <img id='arrow' src={Arrowicon} alt="" />
            </div>
            <div className="searchbar">
                <img src={Search} alt="" />
                <input className='searchinput' type="text" placeholder='Search notes' />
            </div>
            <div className="features">
                <Link to="/Dashboard">
                <div className="btnFunction">
                    <img src={Picon}alt="" />
                    <h5>Dashboard</h5>
                    <img src={Dots} alt="" />
                </div>
                </Link>
                <Link to="/Pomodoro">
                <div className="btnFunction">
                    <img src={Picon}alt="" />
                    <h5>Pomodoro</h5>
                    <img src={Dots} alt="" />
                </div>
                </Link>
                <Link to="/Notes">
                <div className="btnFunction">
                    <img src={NPicon}alt="" />
                    <h5>My Notes</h5>
                    <img src={Dots} alt="" />
                </div>
                </Link>
                <Link to="/Goal">
                <div className="btnFunction">
                    <img src={Picon}alt="" />
                    <h5>Add Goals</h5>
                    <img src={Dots} alt="" />
                </div>
                </Link>
            </div>
        </div>
        <div className="rigthbtn">
            <Link to="Notepad/Pomodoro">
            <div className="settings">
                <img src={Sicon} alt="" />
                <h5>Settings</h5>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar