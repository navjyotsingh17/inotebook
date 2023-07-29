import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000";

  //example of context api and use effect
  // const s1 = {
  //     "name": "navjyot",
  //     "lastname": "singh"
  // }

  // const[state, setState] = useState(s1);

  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "ravleen",
  //             "lastname": "kaur"
  //         })
  //     }, 1000);
  // }

  //defining an empty array for the note state to be used initallly.
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);

  //Get All Notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('authToken')
      }
    });
    const json = await response.json();

    setNotes(json.notes); // Set the notes state with the array of notes from the API response
  }


  // add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('authToken')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();

    setNotes(notes.concat(note.savedNote))// concat return a array whereas push updates an array

    //setNotes(notes.push(json)) //whereas push updates and array
  }

  //delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('authToken')
      }
    });

    // eslint-disable-next-line
    const json = await response.json();

    //console.log(json)
    //console.log("deleting note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('authToken')
      },

      body: JSON.stringify({ title, description, tag })
    });

    // eslint-disable-next-line
    const json = await response.json();
    //console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to update a note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag

        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    // <NoteContext.Provider value={{state, update}}>
    //     {props.children}
    // </NoteContext.Provider>

    //here i am exporting the above methods to used via context API in other components direclty. 
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children} 
      {/* this means that all the children will be able use the context API. */}
    </NoteContext.Provider>
  )
}

export default NoteState;