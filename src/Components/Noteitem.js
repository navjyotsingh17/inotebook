import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {

    //here i am usin the context API and importing the delete note method and also taking the note and updateNote as props
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;


    return (
        //here i am displaying the note tilte, descrpition and tag, when the user clicks on the delete button i am calling the delete note method and passing the note._id as a parameter to delete the note with that id and showing the alert, when the user clicks on the update button the it calls the update note method and pass the note state as a props to the update API
        <div className='col-md-3'>
            <div className="card my-3">
                {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex:'1', margin:'10px 0px 0px 0px'}}>{note.tag}
                    </span> */}
                <div className='card-body'>
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "success"); }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
