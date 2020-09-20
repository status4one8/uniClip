import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Button from "@material-ui/core/Button";
import { useAuth } from "../context";
import * as firebase from "firebase";
import "./Home.css";


// function Home():JSX.Element{
//   return (
//   <div className={styles.container} data-tid="container">
//     <h2>Home</h2>
//     {/* <Link to={routes.COUNTER}>to Counter</Link> */}
//   </div>
// );
// }

// export default Home

function Home() {
  const [notes, setNotes] = useState([]);
  const {user} = useAuth()
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
      <Button variant="contained" onClick={() => {
        console.log(user)
        firebase.auth().signOut().catch(e => console.log(e))
      }}>Logout</Button>
    </div>
  );
}

export default Home;


