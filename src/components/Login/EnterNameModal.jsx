import React, { useState, useEffect } from 'react';
import './login.css';

function EnterNameModal({ onSave }) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (!savedName) {
      setShowModal(true);
    } else {
      onSave(savedName);
    }
  }, [onSave]);

  const handleSave = () => {
    if (name.trim() === '') return;
    localStorage.setItem('username', name);
    onSave(name);
    setShowModal(false);
    window.location.reload();
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box" data-aos="zoom-in">
        <h2>Hey there 👋</h2>
        <p>What should we call you?</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleSave}>Continue</button>
      </div>
    </div>
  );
}

export default EnterNameModal;
