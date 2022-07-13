import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState({message:"", type:""});
  
  const fetchNotes = async()=>{
    const response = await fetch(`https://writenote.herokuapp.com/notes/fetchnotes`, {
      method:'GET',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      } 

    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }

  // Add a note
  // TODO : API call
  const addNote = async(title, description, tag) => {
    const response = await fetch(`https://writenote.herokuapp.com/notes/addnote`, {
      method:'POST',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, description, tag})
    })
    const note = await response.json();
   
    setNotes(notes.concat(note));
    showAlert("Note Added succesfully", 'success')
  };

  // Delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`https://writenote.herokuapp.com/notes/deletenote/${id}`,{
      method:'DELETE',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
    })
    await response.json();
    // console.log(json);

    // console.log("deleting a note with id "+ id);

    // Logic to delete a note in front-end
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert("Note Deleted succesfully", 'success')
    
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`https://writenote.herokuapp.com/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

  // Login to edit in client i.e, in front-end
  let newNotes = JSON.parse(JSON.stringify(notes));
  for(let index = 0; index<newNotes.length;index++){
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
    
  }
  setNotes(newNotes);
  showAlert("Note Updated succesfully", 'success')
  
};


// Alert Function
const showAlert = (message, type)=>{
  setAlert({
    message: message,
    type: type
  })
  setTimeout(() => {
    setAlert(null);
  }, 2000);
}

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes, showAlert, alert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
