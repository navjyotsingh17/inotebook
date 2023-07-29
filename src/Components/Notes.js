import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {

  //here i have importing the API methods from context API, defining the note state, defining useRef to open the modal programatically,using useNavigate() hook for navigation purpose
  const context = useContext(noteContext);

  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({ edit_title: "", edit_description: "", edit_tag: "" })

  const ref = useRef(null);

  const refClose = useRef(null);

  let navigate = useNavigate();

  // here i am using the useEffect hook for checking if the localStorage contains the authToken for current session, if yes then i am calling the getNotes method via context API for fetching hte current user notes. Else i an navigating the user bak to login page.
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      getNotes()
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line 
  }, []) // [] is added becoz i want to run this useEffect only once when the page loads.

  //here the updateNote method take the currentNote as a parameter when the user clicks on the updateNote button.
  const updateNote = (currentNote) => {

    //below is used to click the updateNote icon using the useRef hook.
    ref.current.click();

    //here i am setting the id, edit_title, edit_description and edit_tag based on the current note.
    setNote({ id: currentNote._id, edit_title: currentNote.title, edit_description: currentNote.description, edit_tag: currentNote.tag })
  }

  //below method is used send the updated data like id, title, desc, tag to the editNote method via context API to be updated in the db and after that show a alert.
  const handleClick = (e) => {

    //console.log("updating the note...", note, note.id)

    editNote(note.id, note.edit_title, note.edit_description, note.edit_tag)

    refClose.current.click();

    props.showAlert("Note updated successfully", "success");

    //e.preventDefault() // by writing this the page does not reload
  }

  //onChnage is used for the text field to show the user what he or she is typing
  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* add note component and passing the showAlert method as a props */}
      <Addnote showAlert={props.showAlert} />


      {/* <!-- Button trigger modal by using the useRef hook --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> in the below text fileds i am defining the value name to be used afterwards, calling onChange, defining minLength and making the field required. */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Note Title</label>
                  <input type="text" className="form-control" id="edit_title" name="edit_title" aria-describedby="emailHelp" value={note.edit_title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Note Description</label>
                  <textarea type="text" className="form-control" id="edit_description" name="edit_description" value={note.edit_description} onChange={onChange} minLength={5} required rows="3.5" ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="edit_tag" name="edit_tag" value={note.edit_tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">

              {/* here i have applied a useRef hook on the colse button of the modal to close it programatically */}
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              {/* here i am disabling the update note button on a condition and calling the handleClick function */}
              <button disabled={note.edit_title < 5 || note.edit_description < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your notes</h1>
        <div className="container mx-2">

          {/* here i am checking if the note len is 0 show this message */}
          {notes.length === 0 && 'No notes to be displayed'}
        </div>

        {/* here i am using a higher order fucntion of js which is a map fucntion to display the Noteitem component after fetching the data from the API. and passing a unique key value to each note being rendered.*/}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes;
