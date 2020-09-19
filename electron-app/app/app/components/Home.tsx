// import React from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes.json';
// import styles from './Home.css';

// const clipboard = require('electron-clipboard-extended')
 
// clipboard
// .on('text-changed', () => {
//     let currentText = clipboard.readText()
//     console.log(currentText)
// })
// .once('text-changed', () => {
//     console.log('TRIGGERED ONLY ONCE')
// })
// .on('image-changed', () => {
//     let currentIMage = clipboard.readImage()
// })
// .startWatching();



// function Home():JSX.Element{
//   return (
//   <div className={styles.container} data-tid="container">
//     <h2>Home</h2>
//     {/* <Link to={routes.COUNTER}>to Counter</Link> */}
//   </div>
// );
// }

// export default Home
import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Home() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default Home;


