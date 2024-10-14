import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from './themeContext';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StickyNotes } from './stickyNotes';
import { ToDoList } from './toDoList';
import { Navbar } from './navbar';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );
 
}

export default App;