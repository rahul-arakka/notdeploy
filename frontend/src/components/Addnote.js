import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
import '../App.css'

const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [field, setField] = useState({title:"", description:"", tag:""})

    const onChange = (e)=>{
        setField({...field, [e.target.name]: e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(field.title, field.description, field.tag);
        setField({title:"", description:"", tag:""});

    }

  return (
    <div className="addNote">
      <h1 className="formHeading">Add a Note</h1>
      <form className="my-2" id="noteform" onSubmit={handleClick}>
        <div className="mb-3 d-flex">
        <i className="fa-solid fa-pen-clip"></i>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            placeholder="Enter Title"
            aria-describedby="titleHelp"
            value={field.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3 d-flex">
        <i className="fa-solid fa-file-pen"></i>
        <textarea className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onChange}
            value={field.description}
            minLength={5}
            required
            cols="15" rows="5"> 
        </textarea>
          
        </div>
        <div className="mb-3 d-flex">
        <i className="fa-solid fa-tag"></i>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter Tag"
            onChange={onChange}
            value={field.tag}
            minLength={3}
            required
          />
        </div>

        <div className="btnlen">
          <button type="submit" className="btn btn-dark">
          Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnote;
