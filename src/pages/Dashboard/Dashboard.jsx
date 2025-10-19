import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import EnterNameModal from '../../components/Login/EnterNameModal';
import 'aos/dist/aos.css';
import './dashboard.css'
import Filter from '../../assets/filter.svg'
import Star from '../../assets/star empty.svg'
import Share from '../../assets/share.svg' 
import Fullstar from '../../assets/fullstar.svg'
import ProgressBar from '../../components/progressbar/ProgressBar'
import Diagram from '../../components/Diagram/Diagram';
import word from './word.json'

function Dashboard() {
    const [listGoals, setListGoals] = useState([]);
    const [newNotes, setNewNotes] = useState([]);
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true);
    const [userName, setUserName] = useState(localStorage.getItem('username') || 'User');

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev +  1) % word.length)
                setFade(true)
            }, 500);
        }, 5000);
        return () => clearInterval(interval)
    },[])

    useEffect(() => {
        AOS.init({duration: 1000, once: true})
    },[])
    
    useEffect(() => {
            if(!localStorage || !localStorage.getItem('taskflowgoal')) {return}
            let db = JSON.parse(localStorage.getItem('taskflowgoal'))
            setListGoals(db.listGoals)
        },[])

    useEffect(() => {
        if (!localStorage || !localStorage.getItem('noteniKharie')) { return }
        let db = JSON.parse(localStorage.getItem('noteniKharie'))
        setNewNotes(db.newNotes)
      }, [])
    
    

  return (
    <div className="dashboard-caontainer" >
        <EnterNameModal onSave={(name) => setUserName(name)} />
        <div className="layer1" data-aos="fade-down"
                                data-aos-easing="linear"
                                data-aos-duration="1500">      
            <h1>Welcome, {userName}!👋</h1>
            <h3 className={`quote ${fade ? "fade-in" : "fade-out"}`}>{word[index]}</h3>
        </div>
        <div className="layer2">
            <div className="left"
                data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                <div className="insights">
                    <h1>Insights</h1>
                    <Diagram data={listGoals}/>
                </div>
            </div>
            <div className="right"
            data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                <h1>Notes</h1>
                {newNotes.slice(0, 5).map((note, index) => (
                    <div key={index} className='noteLists' data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="500"
     data-aos-offset="0">
                        <h6>{note.date}</h6>
                        <h2>{note.title}</h2>
                        {note.content > 5 ? <p>{note.content.slice(0, 35)}</p> : <p>{note.content.slice(0, 35)}...</p>}
                    </div>
                ))}
            </div>
        </div>
        <div className="layer3"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500">
            <div className="title">
                <h1>Goals</h1>
            </div>
            <div className="list-goals">
                {listGoals.slice(0, 5).map((list, index)=>(
                    <div className="goal-cards" key={index} data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="500"
     data-aos-offset="0">
                        <div className="goal-select-header">
                            <h4>{list.goal}</h4>
                            <button>
                                <img src={list.fav ? Fullstar : Star} alt="favorite" />
                            </button>
                        </div>
                        <div className="card-info">
                            <strong><p>Target Pomodoro: {list.target}</p></strong>
                            <em><p>Reward: {list.reward}</p></em>
                        </div>
                        <ProgressBar list = {list}/>
                    </div>
                ))} 
            </div>
        </div>
    </div>
  )
}

export default Dashboard