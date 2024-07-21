import React from "react";
import "./card.css";
import { TiPinOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

const Card = ({paragraph,title,date,tags,isPinned}) => {

  const OnEditNote = () =>{
    
  }
  
  const OnDeleteNote = () =>{

  }
    

  return (
    <div className="card-section">
      <div className="titles-icon-pin">
        <div className="titles">
          <h2 className="big-title">Practice of today</h2>
          <h4 className="la-date">12/12/2021</h4>
        </div>
        <TiPinOutline className={isPinned ? "icon-pinned" : "icon-pin"} />
      </div>
      <div className="description-and-tags">
        <p className="description-para">
          Lorem ipsum dolor sit amet consectetur
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          dadadadadadadadadaaaaaaaaaaaaaaaaaaaaaadadaLorem ipsum dolor, sit amet
          consectetur adipisicing elit. Cupiditate, porro quod. Totam quae atque
          neque recusandae id odio, sint earum laborum. Architecto minus dolore
          exercitationem qui tempora animi consequuntur corrupti.lorem Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Suscipit est
          exercitationem deleniti magni, eos nobis sapiente obcaecati quaerat
          neque blanditiis maxime quis sed fugit corrupti ullam illo dolore
          aperiam iusto!adipisicing elit. Nemo, quos?dadadada
        </p>

        <div className="tags-icons">
          <div className="tags">
            <span className="tag">#sport </span>
            <span className="tag">#basket </span>
            <span className="tag">#basket </span>
          </div>

          <div className="icon-delete-edit">
            <button className="btn-delete-note">
              <MdDelete className="icon-delete" />
            </button>

            <button className="edit-card" onClick={() => {OnDeleteNote()}}>
              <MdModeEdit className="icon-edit" onClick={() => {OnEditNote()}} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
