import React, { useState, useEffect } from "react";
import './newCard.css'
import { IoMdClose } from "react-icons/io";
import {MdClose , MdAdd} from "react-icons/md"
import axiosInstance from "../../utils/axiosInstance";

const NewCard = ({
  setOpenAddEditModal,
  type,
  data,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.content || "");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(data?.tags || []);
  const [error, setError] = useState("");

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post(
        "https://notes-app-back-end-mu.vercel.app/add-note",
        {
          title: title,
          content: content,
          tags: tags,
        }
      );
      if (!response.data.error) {
        // console.log(response);
        showToastMessage("Note Added Successfully");
        // setError(response.data.message);
        getAllNotes();
      }
    } catch (error) {
      console.log(response.data.error);
    }
  };

  const EditNote = async () => {
    try {
      const noteId = data._id;
      const response = await axiosInstance.put(
        `https://notes-app-back-end-mu.vercel.app/edit-note/${noteId}`,
        {
          title: title,
          content: content,
          tags: tags,
        }
      );
      if (!response.data.error) {
        // console.log(response);
        showToastMessage("Note Updated Successfully");
        // setError(response.data.message);
        getAllNotes();
      }
    } catch (error) {
      console.log(response.data.error);
    }
  };

  const AddNote = () => {
    addNewNote();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content, tags);
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }

    // API CALL

    // setTitle("");
    // setContent("");
    // setTags([]);

    if (type === "edit") {
      EditNote();
    } else {
      AddNote();
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const onRemoveTag = (tagToRemove, e) => {
    e.preventDefault();
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
  };
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

          <button className="add-tag" onClick={addTag}>
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
                      onClick={(e) => {
                        onRemoveTag(tagg, e);
                      }}
                    />
                  </button>
                </div>
              );
            })}
        </div>

        {error && <p className="error-new-card">{error}</p>}
        <button type="submit" className="btn-create-card">
          {type === "edit" ? "Update" : "Create Card"}
        </button>
      </form>
    </div>
  );
};

export default NewCard