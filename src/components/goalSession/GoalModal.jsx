import React from 'react';
import './GoalModal.css';
import ProgressBar from '../progressbar/ProgressBar'; // optional if you already have one

const GoalModal = ({ goals, selectedGoal, setSelectedGoal, onConfirm, onClose }) => {
  return (
    <div className="goal-modal-overlay" onClick={onClose}>
      <div className="goal-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Select a Goal</h3>

        <div className="goal-list">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`goal-item ${selectedGoal === goal.id ? 'active' : ''}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <input
                type="radio"
                checked={selectedGoal === goal.id}
                onChange={() => setSelectedGoal(goal.id)}
              />
              <div className="goal-info">
                <h4>{goal.goal}</h4>
                <p>Target Session: {goal.target}</p>
                 <ProgressBar list = {goal}/>
              </div>
            </div>
          ))}
        </div>

        <button
          className="confirm-btn"
          disabled={!selectedGoal}
          onClick={() => onConfirm(selectedGoal)}
        >
          Use This Goal
        </button>
      </div>
    </div>
  );
};

export default GoalModal;
