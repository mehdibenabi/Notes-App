import React from "react";
import "./card.css";
import { TiPinOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";

const Card = ({note,tags,onEdit,onDelete,getAllNotes}) => {


  const OnEditNote = () =>{
    onEdit();
  }
  
  const OnDeleteNote = () =>{
    onDelete();
    getAllNotes();
  }

  const updatePin = async (id) =>{
    try {
      const response = await axiosInstance.put(`/update-pin/${id}`,{
        isPinned: !note.isPinned,
      });
      if(!response.data.error){
        console.log(response);
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }




    
// console.log(tags);
  return (
    <div className="card-section">
      <div className="titles-icon-pin">
        <div className="titles">
          <h2 className="big-title">{note.title}</h2>
          <h4 className="la-date">
            {moment(note.createdOn).format("DD MMM YYYY")}
          </h4>
        </div>
        <button className="pin-btn" onClick={()=>{updatePin(note._id)}}>
        <TiPinOutline className={note.isPinned ? "icon-pinned" : "icon-pin"} />
        </button>
      </div>
      <div className="description-and-tags">
        <p className="description-para">{note.content}</p>

        <div className="tags-icons">
          <div className="tags">
            {tags.map((tag, index) => {
              return (
                <span className="tag" key={index}>
                  #{tag}{" "}
                </span>
              );
            })}
          </div>

          <div className="icon-delete-edit">
            <button
              className="btn-delete-note"
              onClick={() => {
                OnDeleteNote();
              }}
            >
              <MdDelete className="icon-delete" />
            </button>

            <button
              className="edit-card"
              onClick={() => {
                OnEditNote();
              }}
            >
              <MdModeEdit className="icon-edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
