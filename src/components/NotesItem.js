import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function NotesItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {note.tag}
                    </span>
                    <div className="d-flex justify-content-between">
                        <i className="fa-regular fa-trash-can h4" onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success"); }}></i>
                        <i className="fa-regular fa-pen-to-square h4" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
