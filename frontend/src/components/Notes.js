import React, {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext";
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {notes, fetchNotes, editNote, showAlert } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
      fetchNotes();
    else {
      navigate('/login')
      showAlert("Please Login to preceed", 'warning');
    }
    // eslint-disable-next-line
  }, [])

  // useRef used to refer a component, We can show a Edit note modal using the edit icon and also through the modal button
  const [field, setField] = useState({id: "", etitle:"", edescription:"", etag:""})

  const refer = useRef(null);
  const refClose = useRef(null);

    const updateNote = (currentnote)=>{
      setField({
        id: currentnote._id,
        etitle: currentnote.title,
        edescription: currentnote.description,
        etag: currentnote.tag
      })
      refer.current.click();
      
    }

    const onChange = (e)=>{
      setField({...field, [e.target.name]: e.target.value})
  }

    const callEdit = ()=>{
      editNote( field.id, field.etitle, field.edescription, field.etag );
      refClose.current.click();
    }
  
  return (
    <div className="col notePage" >
      <div className='noteBox'>
        <Addnote/>
      </div>

          <button type="button" ref={refer} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
          </button>

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="container my-2">
                      <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etitle"
                          name="etitle"
                          value={field.etitle}
                          onChange={onChange}
                          aria-describedby="titleHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="edescription"
                          name="edescription"
                          value={field.edescription}
                          onChange={onChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="etag" className="form-label">
                          Tag
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etag"
                          name="etag"
                          value={field.etag}
                          onChange={onChange}
                        />
                      </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={callEdit}>Update</button>
                </div>
              </div>
            </div>
          </div>
        <div className="formDiv">
        <h2 className='mx-2 my-2 formHeading'>Your Notes</h2>
          {notes.length === 0 && <strong id='noNotes'>No notes to display</strong>}
          <div className="row">

        {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote ={updateNote} note ={note}/>
        })}
        </div>
        </div>  
    </div>
    
  )
}

export default Notes