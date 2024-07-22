import React, { useState, useEffect } from "react";
import './newCard.css'
import { IoMdClose } from "react-icons/io";
import {MdClose , MdAdd} from "react-icons/md"

const NewCard = ({setOpenAddEditModal , type, data}) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags,setTags] = useState([]);
  const [error,setError] = useState("");

  const EditNote = () =>{

  }

  const AddNote = () =>{

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title,content,tags);
    if(!title) {
      setError("Title is required");
      return;
    }
    if(!content) {
      setError("Content is required");
      return;
    }

    // API CALL

    setTitle("");
    setContent("");
    setTags([]);

    if(type="edit"){
      EditNote();
    }else{
      AddNote();
    }

};

const addTag = (e) =>{
  e.preventDefault();
  if(tag.trim() !== ""){
    setTags([...tags,tag.trim()]);
    setTag("");
  }
}

const onRemoveTag = (tagToRemove) =>{
  const newTags = tags.filter((tag)=> tag !== tagToRemove)
  setTags(newTags);
}
// useEffect(() => {
//   console.log("Tags updated:", tags);
// }, [tags]);

  return (
    <div className="new-card-section">
      <IoMdClose
        size={40}
        className="icon-close"
        onClick={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
      />
      <form onSubmit={handleSubmit} className="new-card-form">
        <label for="title" className="new-card-title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="new-card-title-input"
          placeholder="For example: Practice of today"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label for="paragraph" className="new-card-title">
          Content
        </label>
        <textarea
          id="paragraph"
          name="paragraph"
          className="new-card-para"
          placeholder="write here your content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <label for="tags" className="tags-label">
          Tags
        </label>

        <div className="tag-and-btn">
          <input
            type="text"
            id="tags"
            name="tags"
            className="tags-input"
            placeholder="For exemple : #sport"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <button
            className="add-tag"
            onClick={addTag}
          >
            <MdAdd className="icon-add-new-card" />
          </button>
        </div>

        <div className="tags-container">
          {tags?.length > 0 &&
            tags.map((tagg, index) => {
              return (
                <div className="tag-and-btnClose" key={index}>
                  <span className="tag-new-card">#{tagg}</span>

                  <button className="close-tag">
                    <MdClose
                      className="close-tag-icon"
                      onClick={() => {
                        onRemoveTag(tagg);
                      }}
                    />
                  </button>
                </div>
              );
            })}
        </div>

        {error && <p className="error-new-card">{error}</p>}
        <button type="submit" className="btn-create-card">
          Create Card
        </button>
      </form>
    </div>
  );
};

export default NewCard