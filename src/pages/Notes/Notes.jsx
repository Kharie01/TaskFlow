import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './notes.css'
import Back_arrow from '../../assets/back_arrow.svg'
import addBtn from '../../assets/addBtn.svg'
import Noteeditor from '../../components/NoteEditor/Noteeditor';

function Notes() {

  const active = useRef(null);
  const elementRef = useRef(null);
  const navigate = useNavigate();
  const [newNotes, setNewNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  const localSave = (newNotes) => {
    localStorage.setItem('noteniKharie', JSON.stringify({ newNotes }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('noteniKharie')) { return }
    let db = JSON.parse(localStorage.getItem('noteniKharie'))
    setNewNotes(db.newNotes)
  }, [])

  const handleAddnotes = () => {
    setActiveNote({
        id: null,
        title: "",
        content: "",
        tags: [],
        creator: "",
        date: new Date().toLocaleDateString(),
    })
    if (active.current) {
      active.current.style.display = "flex";
    }
  }

  const handleSaveNote = (note) => {
    if (!note.id) {
      note.id = Date.now(); 
    }
    setNewNotes(prev => {
      const exists = prev.find(n => n.id === note.id);
      let upd;
      if (exists) {
        upd =  prev.map(n => (n.id === note.id ? note : n));
      } else {
        upd = [...prev, note];
      }
        localSave(upd);
        return upd;
    });

    if (active.current) {
      active.current.style.display = "none";
    }
  };

  const handleOpenNote = (note) => {
     setActiveNote(note);
    if (active.current) {
      active.current.style.display = "flex";
    }
  };

  const updateNote = (updateNote) => {
    console.log("asdas");
    setNewNotes(prev => {
      const updated = prev.map(note => note.id === updateNote.id ? updateNote : note)
      localSave(updated)
      return updated
    })
  }

  const onDelete = (noteToDelete) => {
    console.log("asdas");
    setNewNotes(prevNotes => {
      const updatedNote = prevNotes.filter(n => n.id  !== noteToDelete.id)
      localSave(updatedNote);
      return updatedNote;
    })
    if (active.current) {
      active.current.style.display = "none";
    }
  }

  const handleExitNotes = () => {
    if(elementRef.current){  
      const el = elementRef.current;
      el.classList.add("animate__animated", "animate__slideOutLeft");

      const onAnimationEnd = () => {
        el.removeEventListener("animationend", onAnimationEnd);
        navigate('')
      };

      el.addEventListener("animationend", onAnimationEnd);
    }
  }

  return (
    <div className='app-layout'>
    <div ref={elementRef} className="container">
      <div className="header">
        <h1>My Notes</h1>
        <img src={Back_arrow} onClick={handleExitNotes} alt="" />
      </div>

      <div className='addBtn' onClick={handleAddnotes}>
        <img src={addBtn} alt="" />
        <h5>Add new Notes</h5>
      </div>

      {newNotes.map((note, index) => (
      <div key={index} className='noteList' onClick={() => handleOpenNote(note)}>
          <h6>{note.date}</h6>
        <h2>{note.title}</h2>
        {note.content > 5 ? <p>{note.content.slice(0, 35)}</p> : <p>{note.content.slice(0, 35)}...</p>}
        <ul>
          {note.tags?.map((tag, index) => (
          <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      ))}
    </div>

    <div ref={active} className="addNotes">
      <Noteeditor onDelete={onDelete} note={activeNote} onSave={handleSaveNote} onUpdate={updateNote} />
    </div>
    </div>
  )
}

export default Notes