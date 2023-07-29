import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {

  //below are the constants for the context API, addnote API and note state
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  //below is the handleClick used by add note button, which takes the title, description and tag from the note state to send as a json request to the add note api for note upload in the database and afterwards a show alert method is called using the props to show the alert that note was added successfully 
  const handleClick = (e) => {
    e.preventDefault() // by writing this the page does not reload
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Note added successfully", "success");
  }

  //below onChange method is used to set the value against the field name and to show the whatever the user is typing
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    // below value tag is used to store the value of the current input field, onChange is used to render the change the user makes in real time, minLength is defined so the particular field should contain atleast 5 characters and required is written so that the feild becomes manditory
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Note Title</label>
        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Note Description</label>
        <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required rows="5" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
      </div>

      {/* disabled is written to make the button disabled if the condition provided is not meet. */}
      <button disabled={note.title < 5 || note.description < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
  );
};

export default Addnote;
