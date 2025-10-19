import React, { useEffect, useState } from 'react';
import GoalModal from './GoalModal';
import ProgressBar from '../../components/progressbar/ProgressBar'; // make sure you import this
import Filter from '../../assets/filter.svg';
import Star from '../../assets/star empty.svg';
import Share from '../../assets/share.svg';
import Fullstar from '../../assets/fullstar.svg';

function GoalSession({progress}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [listGoals, setListGoals] = useState([]);
  const [activeGoal, setActiveGoal] = useState(null);

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('taskflowgoal')) return;
    let db = JSON.parse(localStorage.getItem('taskflowgoal'));
    setListGoals(db.listGoals);
  }, []);

  useEffect(() => {
    if (!activeGoal) return;
     
    if (progress >= activeGoal.target){
      progress = activeGoal.target
    }

    const updatedGoal = {...activeGoal, progress}

    setActiveGoal(updatedGoal)

    setListGoals(prevGoals => {
      const updatedGoals = prevGoals.map(goal =>
        goal.id === activeGoal.id ? updatedGoal : goal
      );
      
      localStorage.setItem('taskflowgoal', JSON.stringify({ listGoals: updatedGoals }));

      return updatedGoals;
    });

}, [progress]);

  return (
    <div className="goal-ses-con">
        <div className="goalsession">

      <button onClick={() => setShowModal(true)}>Select Goal</button>

      {showModal && (
        <GoalModal
          goals={listGoals}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
          onConfirm={(goalId) => {
            const selected = listGoals.find(item => item.id === goalId);
            setActiveGoal(selected);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
    <div className="selectedGoal">
        {activeGoal && (
          <div className="goal-card">
            <div className="goal-select-header">
              <h4>{activeGoal.goal}</h4>
              <button>
                <img src={activeGoal.fav ? Fullstar : Star} alt="favorite" />
              </button>
            </div>

            <div className="card-info">
              <strong><p>Target Session: {activeGoal.target}</p></strong>
              <em><p>Reward: {activeGoal.reward}</p></em>
            </div>

            <ProgressBar list={activeGoal} />
          </div>
      )}
    </div>        
    </div>
  );
}

export default GoalSession;
