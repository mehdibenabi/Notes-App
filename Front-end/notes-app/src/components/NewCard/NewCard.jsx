import React from 'react'
import './newCard.css'
import { IoMdClose } from "react-icons/io";

const NewCard = ({setIsClicked}) => {
    const handleSubmit = (e) => {

    }
  return (
    <div className="new-card-section">
      <IoMdClose
        size={40}
        className="icon-close"
        onClick={() => {setIsClicked(false)}}
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
        />
        <label for="paragraph" className="new-card-title">
          Content
        </label>
        <textarea
          id="paragraph"
          name="paragraph"
          className="new-card-para"
          placeholder="write here your content"
        ></textarea>
        <label for="tags" className="tags-label">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="tags-input"
          placeholder="For exemple : #sport"
        />
        <button type="submit" className="btn-create-card">
          Create Card
        </button>
      </form>
    </div>
  );
}

export default NewCard