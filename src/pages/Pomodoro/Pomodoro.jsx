import React, { use, useEffect, useRef, useState } from 'react'
import './pomodoro.css'
import ProgressBar from '../../components/progressbar/ProgressBar'
import GoalSession from '../../components/goalSession/GoalSession'
import GoalModal from '../../components/goalSession/GoalModal'
import alarm from '../../assets/alarm.mp3'
import Filter from '../../assets/filter.svg'
import Star from '../../assets/star empty.svg'
import Share from '../../assets/share.svg' 
import Fullstar from '../../assets/fullstar.svg'

function Pomodor({setVisible, visible}) {
  const [count, setCount] = useState(1500);
  const [start, setStart] = useState(false);
  const [music, setMusic] = useState("https://www.youtube.com/watch?v=gQqc4EItqxU&list=RDgQqc4EItqxU&start_radio=1");
  const [userUrl, setUserUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTimer, setActiveTimer] = useState("pomodoro");
  const [listGoals, setListGoals] = useState([])
  const [progress, setProgress] = useState(0)
  const showRef = useRef();
  const shortRef = useRef();
  const longRef = useRef();
  const pomorRef = useRef();
  const audioRef = useRef();
  const limit = 0;


  useEffect(() => {
    if(!localStorage || !localStorage.getItem('taskflowgoal')) {return}
    let db = JSON.parse(localStorage.getItem('taskflowgoal'))
    setListGoals(db.listGoals)
  }, [])
  
  useEffect(() => {
    if (!start) return;

    const Interval = setInterval(() => {
        setCount( prev => {

          if(prev <= limit){
            
            setStart(false);
            setProgress(progress => progress + 1)
            audioRef.current.play().catch(console.warn);

            if (activeTimer == "pomodoro") {setCount(1500)}
            else if (activeTimer == "long") {setCount(900);}
            else if(activeTimer == "short"){setCount(300);}
            
            return prev;

          }

          return prev - 1;
          
        })
      }, 1000)

      return() => clearInterval(Interval);

  }, [start])

  useEffect(() => {
    if (!start) document.title = "Pomodoro Timer";
    document.title = `Pomodoro ${`${Math.floor(count / 60)}:${String(count % 60).padStart(2, "0")}`}`;
  }, [start,count])

  const handleStart = async () => {
    try {
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.volume = 1.0;
      audioRef.current.currentTime = 0;
    } catch (error) {
      console.log("error")
    }
    
    setStart(prev => !prev)
  }

  const handleReset = (props) => {
    if (props == "pomodoro") {
      setStart(false);
      setCount(1500);
    }else if (props == "long") {
      setStart(false);
      setCount(900);
    }else if(props == "short"){
      setStart(false);
      setCount(300);
    }
    
  }

  const handleCustomize = () => {
    if(showRef.current){
      const show = showRef.current;
    
    if (show.classList.contains("show")) {
        show.classList.remove("show");
      } else {
        show.classList.add("show");
      }
    }
  }

  const handleOption = (props, ref) => {
    [pomorRef, shortRef, longRef].forEach(r => {
      if (r.current) r.current.classList.remove("click");
    });
  
    if(props == "short"){
      setCount(300);
      setStart(false);
      setActiveTimer("short");
    }else if (props == "long") {
      setCount(900);
      setStart(false);
      setActiveTimer("long");
    }else if(props == "pomodoro"){
      setCount(1500);
      setStart(false);
      setActiveTimer("pomodoro");
    }

    if (ref.current) {
      ref.current.classList.add("click");
    }
  }

  const handleFullscreen = () => {
    console.log(listGoals)
    setVisible(!visible);
    
  }

  return (
    <div className="main-container" style={{ backgroundImage: `url(${userUrl})` }} transition-style="in:wipe:down" >
        <div className="timer">
          <div className="choose-btn">
            <button ref={pomorRef} className='click' onClick={() => handleOption("pomodoro", pomorRef)}>Pomodoro</button>
            <button ref={shortRef} onClick={() => handleOption("short", shortRef)}>Short Break</button>
            <button ref={longRef} onClick={() => handleOption("long", longRef)}>Long Break</button>
          </div>

          <h1>{`${Math.floor(count / 60)}:${String(count % 60).padStart(2, "0")}`}</h1>

          <div className="start">
            { start === false ? <button onClick={() => handleStart()}>START</button> : <button onClick={() => handleStart()}>PAUSE</button>}
            <button onClick={() => handleReset(activeTimer)}>RESET</button>
          </div>
        </div>
        <GoalSession progress = {progress} />
        <div className="features-pomodoro">
          <button onClick={handleFullscreen}>Full Width</button>
          <button onClick={handleCustomize}>Customize</button>
        </div>


        <div ref={showRef} className="Popover">
          <h1>Customize your Pomodoro timer</h1>
          <div className="option">
            <div className="player">
              <label htmlFor="Music">Youtube Music</label>
              <input id='Music' type="text" placeholder='Enter Youtube Link' onChange={(e) => setMusic(e.target.value)}/>
              <iframe 
                src={`https://www.youtube.com/embed/${music}?autoplay=1`} 
                frameborder="0" 
                allow="autoplay; encrypted-media"
                style={{ width: "300px", height: "80px", border: "none" }}
                >
              </iframe>
            </div>
            <div className="line"></div>
            <div className='background'>
              <label htmlFor="Bg">Background</label>
              <input id='Bg' type="text" placeholder='Enter Background Link' onChange={(e) => setUserUrl(e.target.value)} />
              <select onChange={(e) => setUserUrl(e.target.value)} name="Background" id="Bg">
                <option value="https://studywithme.io/aesthetic-pomodoro-timer/3ce5f595f1a64dc1c1ee.jpg">Garden</option>
                <option value="https://wallpapers.com/images/high/train-station-aesthetic-anime-scenery-nnus3yktrftr48hu.webp">Train</option>
                <option value="https://img1.wallspic.com/previews/7/5/7/9/6/169757/169757-howls_moving_castle-anime-ghibli_museum-world-natural_landscape-x750.jpg">Ship</option>
                <option value="https://img3.wallspic.com/previews/2/3/5/6/2/126532/126532-landscape-digital_art-mountain_range-nature-train-x750.jpg">Mountain</option>
              </select>
            </div>
          </div>
        </div>
        <audio ref={audioRef} preload='auto' src={alarm}/>
      </div>

  )
}

export default Pomodor