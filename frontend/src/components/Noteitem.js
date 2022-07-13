import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    // console.log(note);

  return (
    <div className='col-md-6 my-3'>
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <h5>{note.title}</h5>
                    <i className="fa-solid mx-2 fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid mx-2 fa-trash-can"  onClick={()=>{deleteNote(note._id)}}></i>
                </div>
            <p className="card-text">{note.description}</p>
            
            </div>
        </div>
    </div>
    
  )
}

export default Noteitem