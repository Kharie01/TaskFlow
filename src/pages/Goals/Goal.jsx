import React, { use, useEffect, useRef, useState } from 'react'
import './goal.css'
import ProgressBar from '../../components/progressbar/ProgressBar'
import 'aos/dist/aos.css';
import AOS from 'aos';
import Filter from '../../assets/filter.svg'
import Star from '../../assets/star empty.svg'
import Share from '../../assets/share.svg' 
import Fullstar from '../../assets/fullstar.svg'

function Goal() {
    const [goals, setGoals] = useState("");
    const [reward, setReward] = useState("");
    const [target, setTarget] = useState();
    const [prog, setProg] = useState(0);
    const [fav, setFav] = useState(false);
    const [id, setId] = useState(1);
    const [active, setActive] = useState(false)
    const [listGoals, setListGoals] = useState([]);
    const [showGoals, setShowGoals]= useState([]);
    const [showFavOnly, setShowFavOnly] = useState(false);
    const showPopover = useRef();

    useEffect(() => {
            AOS.init({duration: 1000, once: true})
        },[])

    useEffect(() => {
        setShowGoals(listGoals)
    }, [listGoals])

    useEffect(() => {
        if (listGoals.length > 0) localSave(listGoals);
    }, [listGoals]);
    
    useEffect(() => {
        if (showFavOnly) {
            setShowGoals(listGoals.filter(goal => goal.fav));
        } else {
           setShowGoals(listGoals);
        }   
    }, [showFavOnly, listGoals]);

    const localSave = (listGoals) => {
        localStorage.setItem('taskflowgoal', JSON.stringify({ listGoals }))
    }

    useEffect(() => {
        if(!localStorage || !localStorage.getItem('taskflowgoal')) {return}
        let db = JSON.parse(localStorage.getItem('taskflowgoal'))
        setListGoals(db.listGoals)
    },[])

    const handlePopover = () => {
        if(showPopover.current){
            const active = showPopover.current;

            if(active.classList.contains("showAddGoals")){
                active.classList.remove("showAddGoals")
            }else{
                active.classList.add("showAddGoals")
            }
        }
    }
    
    const handleAddGoal = () => {
        setId(id + 1)
        setListGoals((prev) => [...prev, {
            id: id,
            goal: goals,
            target: target,
            reward: reward,
            progress: 0,
            fav: fav
            }]
        );
        
        setGoals("")
        setReward("")
        setTarget("")
        handlePopover()

    }

    const  handleFavoriteGoal = () => {
        setShowFavOnly(prev => !prev);
        setActive(!active)
    }

    const addFavGoal = (favGoal) => {
        setListGoals(prev =>
            prev.map(goal =>
            goal.id === favGoal.id ? { ...goal, fav: !goal.fav } : goal
            )
        );
    }

  return (
    <div className="goal-container">
        <div className="goal-header"
     data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">
            <h1>My Goals</h1>
            <div className="goal-left-button">
                <button>
                    <img src={Share} alt="" />
                </button>
                <button onClick={handleFavoriteGoal}>
                    <img src={!active ? Star : Fullstar}  alt=""/>
                </button>
                <button>
                    <img src={Filter} alt="" />
                    Filter
                </button>
                <button onClick={handlePopover}>
                    Add Goal
                </button>
            </div>
        </div>
        <div ref={showPopover} className="popoverAddGoal">
            <div className="goal-input">
                <h4>New Goal</h4>
                <p>Goal</p>
                <input type="text" onChange={(e) => {setGoals(e.target.value)}} value={goals}/>
                <div className="goals">
                    <span>
                    <p>Target Pomodoros</p>
                    <input type="number" onChange={(e) => {setTarget(e.target.value)}} value={target}/>
                    </span>
                    <span>
                    <p>Reward</p>
                    <input type="text" onChange={(e) => {setReward(e.target.value)}} value={reward}/>
                    </span>
                </div>
                <button onClick={handleAddGoal}>Add</button>
            </div>
        </div>

        <div className="goal-main">
            <div className="inProgres"  data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="500"
     data-aos-offset="0" >
                <h3>in Progress</h3>
                <div className="list-goal">
                    {showGoals.filter((list) => list.progress < list.target).map((list, index)=>(
                        <div className="goal-card" key={index}>
                            <div className="goal-select-header">
                                <h4>{list.goal}</h4>
                                <button onClick={() => addFavGoal(list)}>
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
            <div className="done"  data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="500"
     data-aos-offset="0" >
                <h3>Done</h3>
                <div className="list-goal">
                    {showGoals.filter((item) => item.progress >= item.target).map((list, index)=>(
                        <div className="goal-card" key={index}>
                            <div className="goal-select-header">
                                <h4>{list.goal}</h4>
                                <button onClick={() => addFavGoal(list)}>
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
    </div>
  )
}

export default Goal