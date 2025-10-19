import React, { useEffect, useRef, useState } from 'react'
import './Note_editor.css'
import { useEditor, EditorContent } from '@tiptap/react'
import { Placeholder } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'

import ArrowRight from '../../assets/arrowRight.svg'
import DotsHori from '../../assets/horiDots.svg'
import Bold from '../../assets/bold.svg'
import Italic from '../../assets/italic.svg'
import Link from '../../assets/link.svg'
import Left from '../../assets/alignLeft.svg'
import Center from '../../assets/alignCenter.svg'
import Right from '../../assets/alignRight.svg'
import Justify from '../../assets/alignJustify.svg'
import Add from '../../assets/addBtn.svg'
import Bulletlist from '../../assets/bulletList.svg'
import List from '../../assets/list.svg'
import Redo from '../../assets/redo.svg'
import Undo from '../../assets/undo.svg'



function Noteeditor({ note, onSave, onDelete, onUpdate }) {
  const showRef = useRef(null);

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [creator, setCreator] = useState(note?.creator || '');
  const [id, setId] = useState(note?.id || '');
  const [date, setDate] = useState(note?.date || '');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(note?.tags || []);
  const [formatText, setFormatText] = useState([]);

  const editor = useEditor({
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        TextStyle,
        FontSize,
        Placeholder.configure({
            placeholder: 'Write Something....'
        }),
    ],
    content: content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  })

  useEffect(() => {
    if(!note) {return}
    if(note == null){
        setTitle("");
        setCreator("");
        setId(Date.now());
        setDate(new Date().toLocaleDateString());
        setTags([]);
    }else{
        setTitle(note.title);
        setCreator(note.creator);
        setId(note.id);
        setDate(note.date || new Date().toLocaleDateString());
        setTags(note.tags || []);
    }
    

    const newContent = note.formatText || note.content || "<p></p>"
    setContent(newContent);

    if (editor){
      editor.commands.setContent(newContent);
    }
  }, [note, editor]);

  const handleTags = () => {
    if(!newTag.trim()) return;

    const exist = tags.find(t => t.toLowerCase() === newTag.toLowerCase())
    if(exist){
      return;
    }else{
      setTags(t => [...t, newTag])
      setNewTag('');
    }
  }

  const handleShowPopover = () => {
    if (showRef.current) {
      const active = showRef.current;

      if (active.classList.contains("show")) {
        active.classList.remove("show");
      } else {
        active.classList.add("show");
      }
    }
  }
  
  const handleDeleteNote = (note) => {
    onDelete(note);
  }

  const handleSave = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const text = editor.getText();

    const today = new Date();
    const noteData = {
      id: id || Date.now(),
      title,
      content: text,
      creator,
      tags,
      formatText: html,
      date: date || today.toLocaleDateString(),
    };
    onSave(noteData);
  };

  const handleUpdate = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const text = editor.getText();

    const updatedNote = {
      ...note,
      id,
      title,
      content: text,
      formatText: html,
      creator,
      tags,
      date,
    };

    if (onUpdate) onUpdate(updatedNote);
  };

  
  const handleFontSizeChange = (e) => {
    const value = e.target.value;
    editor.chain().focus().setMark('textStyle', { fontSize: value }).run();
  };

  return (
    <div className="text-editor">

      <header>
        <div className="locator">
          <h4>My Notes</h4>
          <img src={ArrowRight} alt="" />
          <h4>{note?.title || 'Untitled'}</h4>
        </div>

        <div className='option'>
          <div ref={showRef} className='popOver'>
            <h4>Do you want to Delete the note</h4>
            <button onClick={() => handleDeleteNote(note)}>Delete</button>
          </div>
          <img onClick={handleShowPopover} src={DotsHori} alt="" />
        </div>
      </header>

      <section>
        <h4>Title</h4>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <h4>Created by</h4>
        <input type="text" value={creator} onChange={(e) => setCreator(e.target.value)} />  

        <h4>Date <span>{note?.date || 'New Note'}</span></h4>
        <div className="tags">
          <h4>Tags</h4>
          <ul className='tagName'>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
          </ul>
          <input type="text" onChange={(e) => setNewTag(e.target.value)}/>
          <button onClick={handleTags}><img src={Add} alt="" />Add new Tags</button>
        </div>
      </section>

      <nav>
        <ul>
            <li>
                <select onChange={handleFontSizeChange}>
                    <option value="" disabled>Font Size</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                </select>
            </li>
            <li className='line'></li>
            <li onClick={() => editor && editor.chain().focus().toggleBold().run()}>
                <img src={Bold} alt="Bold" />
            </li>
            <li onClick={() => editor && editor.chain().focus().toggleItalic().run()}>
                <img src={Italic} alt="Italic" />
            </li>
            <li onClick={() => editor && editor.chain().focus().toggleBulletList().run()}>
                <img src={Bulletlist} alt="Bullet List" />
            </li>
            <li onClick={() => editor && editor.chain().focus().toggleOrderedList().run()}>
                <img src={List} alt="List" />
            </li>
            <li className='line'></li>
            <li onClick={() => editor && editor.chain().focus().setTextAlign('left').run()}>
                <img src={Left} alt="Align Left" />
            </li>
            <li
                onClick={() =>
                    editor && editor.chain().focus().setTextAlign('center').run()
                }
            >   
                <img src={Center} alt="Align Center" />
            </li>
            <li onClick={() => editor && editor.chain().focus().setTextAlign('right').run()}>
                <img src={Right} alt="Align Right" />
            </li>
            <li onClick={() => editor && editor.chain().focus().setTextAlign('justify').run()}>
                <img src={Justify} alt="Justify" />
            </li>
            <li className='line'></li>
            <li onClick={() => editor && editor.chain().focus().undo().run()}>
                <img src={Undo} alt="" />
            </li>
            <li onClick={() => editor && editor.chain().focus().redo().run()}>
                <img src={Redo} alt="" />
            </li>
            <li className='line'></li>
            <li>
            {!note?.id ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleUpdate}>Update</button>
            )}
            </li>
        </ul>
      </nav>

      <main>
        <EditorContent editor={editor} className="editor"/>
      </main>
    </div>
  )
}

export default Noteeditor